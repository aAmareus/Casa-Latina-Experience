import { useEffect, useState, useRef } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { PayPalProvider, PayPalOneTimePaymentButton } from "@paypal/react-paypal-js/sdk-v6"

import { useAuth } from "../context/auth.context.jsx"
import { imgUrl } from "../utils/imgUrls.utils.jsx"
import { getCheckout, createPaypalOrder, capturePaypalOrder } from "../api/payments.api.js"
import { cancelReserva } from "../api/reservas.api.js"
import { notify } from "../utils/notify.utils.js"

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID
const PAYPAL_ENV = import.meta.env.VITE_PAYPAL_ENV === "production" ? "production" : "sandbox"


const money = (value) =>
    Number(value).toLocaleString("es-CL", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })

const brl = { format: (value) => `R$ ${money(value)}` }
const usd = { format: (value) => `US$ ${money(value)}` };

const formatRate = (rate) => 
    Number(rate).toLocaleString("es-CL", {
        minimumFractionDigits: 4,
        maximumFractionDigits: 6,
    })

const formatDate = (value) =>
    new Intl.DateTimeFormat("es-CL", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(value))

const formatTime = (value) => 
    new Intl.DateTimeFormat("es-CL", { hour: "2-digit", minute: "2-digit", hour12: false }).format(
        new Date(value),
    )

const Card = ({ children, className= "" }) => (
    <section className={`rounded-2xl bg-white p-6 shadow-md ${className}`}>
        {children}
    </section>
)

// Avisa el resultado del pago
const BANNER_STYLES = {
    success: "border-green-600 bg-green-100 text-green-900",
    warning: "border-amber-500 bg-amber-100 text-amber-900",
    error: "border-red-600 bg-red-100 text-red-900",
    info: "border-blue-600 bg-blue-100 text-blue-900"
}

const Banner = ({ result }) => {
    if(!result) return null

    return (
        <div
            role={result.type === "success" || result.type === "info" ? "status" : "alert"}
            className={`rounded-xl border-l-4 p-4 ${BANNER_STYLES[result.type]}`}
        >
            <p className="font-bold">{result.title}</p>
        </div>
    )
}

const Checkout = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const { user, loading: authLoading } = useAuth()

    const [checkout, setCheckout] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [cancelling, setCancelling] = useState(false)

    // Evita mostrar dos avisos de error por el mismo intento de pago
    const errorShown = useRef(false)


    // Sin sesión -> login y vuelta acá.
    useEffect(() => {
        if(authLoading || user) return

        navigate("/login", {
            replace: true,
            state: { from: location.pathname },
        })
    }, [authLoading, user, navigate, location.pathname])

    useEffect(() => {
        if(authLoading || !user) return

        let cancelled = false

        const load = async () => {
            try {
                const data = await getCheckout(id)
                if(!cancelled) setCheckout(data.checkout)
            } catch(e) {
                if(!cancelled) setError(e.message)
            } finally {
                if(!cancelled) setLoading(false)
            }
        }

        load()

        return () => {
            cancelled = true
        }
    }, [id, authLoading, user])


    const refreshCheckout = async () => {
        try {
            const data = await getCheckout(id)
            if(data?.checkout?.reservation) setCheckout(data.checkOut)
        } catch {
            // keeps what its showing
        }
    }

    const handleCreateOrder = async () => {
        errorShown.current = false

        try {
            const data = await createPaypalOrder(id)

            // si cambió la conversión mientras carga, se muestra lo que se va a cobrar
            setCheckout((current) => (current ? { ...current, pricing: data.pricing } : current))

            return { orderId: data.orderId }
        } catch(e) {
            errorShown.current = true
            notify.paymentError(e.message)

            if(e.status === 409 || e.status === 410) refreshCheckout()

            throw e
        }

        
    }

    const handleApprove = async ({ orderId }) => {
        errorShown.current = false
        try {
            const result = await capturePaypalOrder(orderId)


            if(result?.pending_review) {
                notify.paymentReview(result.message)

                return
            }

            setCheckout((current) =>
                current?.reservation
                ? {
                    ...current,
                    reservation: {
                        ...current.reservation,
                        estado: "confirmada",
                        hold_expires_at: null
                    }
                }
                : current
        )

        notify.paymentSuccess(user?.email)

        window.scrollTo({ top: 0, behavior: "smooth" })

        // Después se actualizan los montos reales cobrados.
        refreshCheckout()
        } catch(e) {
            errorShown.current = true
            notify.paymentError(e.message)
        }
    }

    const handleCancelPayment = () => {
        notify.paymentCancelled()
    }

    const handlePaymentError = (e) => {
        console.error("Paypal error: ", e)

        // Si ya se avisó un error mas específico, no se repite.
        if(errorShown.current) return

        errorShown.current = true
        notify.paymentError(
            e?.code === "INSTRUMENT_DECLINED"
            ? e.message
            : "No se realizó ningún cobro. Inténtalo nuevamente."
        )
    }

    const handleCancelReservation = async () => {
        if(!window.confirm("¿Seguro que quieres cancelar esta reserva?")) return

        try {
            setCancelling(true)
            await cancelReserva(id)

            setCheckout((current) => ({
                ...current,
                reservation: { ...current.reservation, estado: "cancelada" },
            }))
            notify.reservationCancelled()
        } catch(e) {
            notify.reservationCancelError(e.message)
        } finally {
            setCancelling(false)
        }
    }

    if(authLoading || loading) {
        return <p className="p-20 text-center">Cargando tu reserva...</p>
    }

    if(error || !checkout?.reservation) {
        return (
            <div className="mx-auto max-w-xl p-20 text-center">
                <p className="mb-6">{error ?? "No encontramos esta reserva."}</p>
                <Link to="/" className="underline">
                    Volver al inicio
                </Link>
            </div>
        )
    }

    const { reservation, pricing } = checkout

    const Summary = (
        <Card>
            <div className="flex flex-col gap-5 sm:flex-row">
                {reservation.room.image && (
                    <img
                        src={imgUrl(reservation.room.image)}
                        alt={reservation.room.name}
                        className="aspect-4/3 w-full rounded-xl object-cover sm:w-56"
                    />
                )}

                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold">{reservation.room.name}</h2>
                    <p>
                        <span className="font-semibold">Check-in:</span> {" "}
                        {formatDate(reservation.check_in)}
                    </p>
                    <p>
                        <span className="font-semibold">Check-out:</span>{" "}
                        {formatDate(reservation.check_out)}
                    </p>
                    <p>
                        {reservation.nights} {reservation.nights === 1 ? "noche" : "noches"}
                    </p>
                </div>
            </div>
        </Card>
    )

    if(reservation.estado === "confirmada") {
        return (
            <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
                <Card className="text-center">
                    <h1 className="mb-2 text-3xl font-bold">¡Reserva confirmada!</h1>
                    <p>Recibimos tu pago. ¡Te esperamos en Casa Latina!</p>
                    
                    {pricing && (
                        <p className="mt-3">
                            Total pagado: <strong>{usd.format(pricing.total_usd)}</strong>{" "}
                            ({brl.format(pricing.total_brl)})
                        </p>
                    )}
                </Card>

                {Summary}

                <Link to="/" className="text-center underline">
                    Volver al inicio
                </Link>
            </div>
        )
    }


    if(reservation.estado === "cancelada") {
        return (
          <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
            <Card className="text-center">
              <h1 className="mb-2 text-2xl font-bold">
                Esta reserva ya no está activa
              </h1>
              <p>
                Fue cancelada o venció el tiempo para pagarla. No se hizo ningún
                cobro.
              </p>
            </Card>

            <Link to="/" className="text-center underline">
              Elegir otra habitación
            </Link>
          </div>
        );
    }

    return (
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-6">
            <h1 className="text-3xl font-bold">Completa tu reserva</h1>

            {Summary}

            {pricing && (
                <Card>
                    <h2 className="mb-4 text-xl font-bold">¿Cuánto vas a pagar?</h2>

                    <dl className="flex flex-col gap-3">
                        <div className="flex justify-between gap-4">
                            <dt>Precio de tu estadía</dt>
                            <dd className="font-semibold">{brl.format(pricing.total_brl)}</dd>
                        </div>

                        <div className="flex justify-between gap-4">
                            <dt>
                                Tipo de cambio
                                <span className="block text-sm opacity-70">
                                    {pricing.rate_date && `Actualizado el ${pricing.rate_date}. `}
                                    {pricing.margin_pct > 0 && 
                                      `Incluye ${pricing.margin_pct}% de margen cambiarlo.`}
                                </span>
                            </dt>
                            <dd className="font-semibold">
                                1 R$ = US$ {formatRate(pricing.exchange_rate)}
                            </dd>
                        </div>


                        <hr />


                        <div className="flex items-baseline justify-between gap-4 text-xl">
                            <dt className="font-bold">Total a pagar en Paypal</dt>
                            <dd className="font-bold">{usd.format(pricing.total_usd)}</dd>
                        </div>
                    </dl>

                    <p className="mt-4 text-sm opacity-70">
                        {brl.format(pricing.total_brl)} x {formatRate(pricing.exchange_rate)} ={" "}
                        {usd.format(pricing.total_usd)}. El cobro se hace en dólares (USD). 
                        Si tu tarjeta o cuenta Paypal está en otra moneda, tu banco o Paypal pueden aplicar su propia conversión.
                    </p>
                </Card>
            )}

            <Card>
                {reservation.hold_expires_at && (
                    <p className="mb-4 text-sm">
                        Tus fechas están reservadas hasta las{" "}
                        <strong>{formatTime(reservation.hold_expires_at)}</strong>.
                        Si no pagas antes, quedarán libres para otros viajeros.
                    </p>
                )}

                {PAYPAL_CLIENT_ID ? (
                    <PayPalProvider
                        clientId={PAYPAL_CLIENT_ID}
                        environment={PAYPAL_ENV}
                        components={["paypal-payments"]}
                        pageType="checkout"
                    >
                        <PayPalOneTimePaymentButton
                            createOrder={handleCreateOrder}
                            onApprove={handleApprove}
                            onCancel={handleCancelPayment}
                            onError={handlePaymentError}
                        />
                    </PayPalProvider>
                ) : (
                    <p role="alert">Falta configurar VITE_PAYPAL_CLIENT_ID.</p>
                )}

                <button
                    type="button"
                    onClick={handleCancelReservation}
                    disabled={cancelling}
                    className="mt-6 w-full cursor-pointer rounded-xl border border-current py-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {cancelling ? "Cancelando..." : "Cancelar reserva"}
                </button>
            </Card>
        </div>
    )
}

export default Checkout