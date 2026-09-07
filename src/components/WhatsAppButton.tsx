import { MessageCircle } from "lucide-react";

const phoneNumber = "919535702274";
const message = "Hi Paw Brothers, I would like to know more about your dog-care services.";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Paw Brothers on WhatsApp"
      className="fixed bottom-20 right-4 z-40 grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105 lg:bottom-6 lg:right-6"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}