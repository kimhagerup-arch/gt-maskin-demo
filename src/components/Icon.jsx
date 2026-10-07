import {
  ArrowRight,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Facebook,
  Gauge,
  GraduationCap,
  Heart,
  Images,
  Info,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Package,
  Phone,
  Play,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  Snowflake,
  Star,
  Tag,
  ThumbsUp,
  Tractor,
  Trash2,
  Truck,
  Video,
  Wrench,
  X,
  Zap,
} from "lucide-react";

const ICONS = {
  ArrowRight,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Facebook,
  Gauge,
  GraduationCap,
  Heart,
  Images,
  Info,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Package,
  Phone,
  Play,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  Snowflake,
  Star,
  Tag,
  ThumbsUp,
  Tractor,
  Trash2,
  Truck,
  Video,
  Wrench,
  X,
  Zap,
};

/** Slår opp et lucide-ikon på navn fra datafilene. Ukjent navn gir Wrench. */
export default function Icon({ name, size = 24, strokeWidth = 1.8, className, ...rest }) {
  const Component = ICONS[name] || Wrench;
  return (
    <Component
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
      {...rest}
    />
  );
}

export { ICONS };
