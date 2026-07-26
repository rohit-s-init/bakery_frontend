import { useState } from "react";
import { X, MapPin, Phone, User, ShoppingBag, ChevronDown, ChevronUp, Lock, Ban, UserX } from "lucide-react";

interface OrderPopupProps {
    isOpen: boolean;
    onClose: () => void;
    item: {
        img: string;
        name: string;
        price: string;
        desc: string;
        tag: string;
    };
    onSubmit: (orderData: OrderData) => void;
    isActive: boolean;
}

interface OrderData {
    name: string;
    phone: string;
    address: string;
    quantity: number;
    notes: string;
}

export function OrderPopup({ isOpen, onClose, item, onSubmit, isActive }: OrderPopupProps) {
    const [formData, setFormData] = useState<OrderData>({
        name: "",
        phone: "",
        address: "",
        quantity: 1,
        notes: "",
    });
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [errors, setErrors] = useState<Partial<OrderData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    // Extended description with more details
    const fullDescription = `${item.desc}. Made with premium ingredients and traditional French techniques. 
    Each pastry is carefully crafted by our master bakers to ensure the perfect texture and flavor balance. 
    Perfect for special occasions or everyday indulgence.`;

    if (!isOpen) return null;

    const validateForm = () => {
        const newErrors: Partial<OrderData> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Delivery address is required";
        }

        if (formData.quantity < 1) {
            // newErrors.quantity = "Quantity must be at least 1";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            onSubmit(formData);
            setOrderSuccess(true);

            // Reset form after success
            setTimeout(() => {
                setOrderSuccess(false);
                onClose();
                setFormData({ name: "", phone: "", address: "", quantity: 1, notes: "" });
            }, 2000);
        } catch (error) {
            console.error("Order failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name as keyof OrderData]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleQuantityChange = (delta: number) => {
        const newQuantity = Math.max(1, formData.quantity + delta);
        setFormData(prev => ({ ...prev, quantity: newQuantity }));
    };

    // Calculate total price
    const priceValue = parseFloat(item.price.replace("$", ""));
    const totalPrice = (priceValue * formData.quantity).toFixed(2);

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div
                    className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl animate-scale-up max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-gray-100 transition-colors shadow-md"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Header with image */}
                    <div className="relative h-64 sm:h-80 overflow-hidden">
                        <img
                            src={item.img}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <div className="flex items-start justify-between">
                                <div>
                                    <span className="inline-block glass rounded-full px-3 py-1 text-xs font-medium text-white mb-2">
                                        {item.tag}
                                    </span>
                                    <h2 className="font-display text-3xl sm:text-4xl">{item.name}</h2>
                                </div>
                                <span className="font-display text-3xl text-white/90 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                                    {item.price}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                        {/* Description with Read More */}
                        <div className="mb-6">
                            <p className="text-gray-700 leading-relaxed">
                                {showFullDescription ? fullDescription : `${item.desc}...`}
                            </p>
                            <button
                                onClick={() => setShowFullDescription(!showFullDescription)}
                                className="mt-2 text-caramel hover:text-primary font-medium text-sm flex items-center gap-1 transition-colors"
                            >
                                {showFullDescription ? (
                                    <>Read Less <ChevronUp className="w-4 h-4" /></>
                                ) : (
                                    <>Read More <ChevronDown className="w-4 h-4" /></>
                                )}
                            </button>
                        </div>

                        {/* Order Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    <User className="w-4 h-4 inline mr-1" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} 
                    focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all`}
                                    placeholder="John Doe"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    <Phone className="w-4 h-4 inline mr-1" />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} 
                    focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all`}
                                    placeholder="+1 234 567 8900"
                                />
                                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                            </div>

                            {/* Address */}
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                    <MapPin className="w-4 h-4 inline mr-1" />
                                    Delivery Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-red-500' : 'border-gray-200'} 
                    focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all`}
                                    placeholder="123 Main St, City, State"
                                />
                                {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                            </div>

                            {/* Quantity & Price */}
                            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <label className="text-sm font-medium text-gray-700">Quantity</label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange(-1)}
                                            className="w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-100 
                        flex items-center justify-center transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-10 text-center font-medium">{formData.quantity}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange(1)}
                                            className="w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-100 
                        flex items-center justify-center transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Total</p>
                                    <p className="font-display text-2xl text-caramel">${totalPrice}</p>
                                </div>
                            </div>

                            {/* Special Notes */}
                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                                    Special Instructions (Optional)
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={2}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 
                    focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all resize-none"
                                    placeholder="Any dietary restrictions or special requests..."
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting || !isActive}
                                className={`w-full py-4 px-6 rounded-full font-medium shadow-soft
        flex items-center justify-center gap-2 transition-all duration-300
        ${!isActive
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60 grayscale"
                                        : "bg-primary text-white hover:scale-[1.02]"
                                    }
        ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
    `}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Processing...
                                    </>
                                ) : orderSuccess ? (
                                    <>
                                        <ShoppingBag className="w-5 h-5" />
                                        Order Placed! 🎉
                                    </>
                                ) : !isActive ? (
                                    <>
                                        <Lock className="w-5 h-5" />
                                        Login Required
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag className="w-5 h-5" />
                                        Place Order
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <p className="mt-4 text-xs text-gray-500 text-center">
                            By placing an order, you agree to our terms and conditions.
                            Delivery times may vary based on location.
                        </p>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-up {
          from { 
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-up {
          animation: scale-up 0.4s ease-out;
        }
      `}</style>
        </>
    );
}