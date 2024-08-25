import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-muted py-5 border-t border-t-gray-300">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-4 md:px-6">
        <div className="flex flex-col items-start gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <span className="text-lg font-bold">Blog</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Discover the latest insights and trends in our blog.
          </p>
        </div>
        <div className="grid gap-2">
          <h4 className="text-sm font-medium">Quick Links</h4>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Contact
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Terms of Service
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="text-sm font-medium">Categories</h4>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Technology
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Design
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Business
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Lifestyle
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="text-sm font-medium">Follow Us</h4>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Twitter
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Instagram
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            LinkedIn
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            YouTube
          </Link>
        </div>
      </div>
      <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
        &copy; 2024 Blog. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
