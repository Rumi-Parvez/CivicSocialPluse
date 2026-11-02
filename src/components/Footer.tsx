import Image from "next/image";
import Link from "next/link";

import LogoB from "../app/assets/logoB.png";
import LogoW from "../app/assets/LogoW.png";

import { 
  FaFacebookF, 
  FaGithub, 
  FaLinkedinIn, 
  FaInstagram, 
  FaYoutube, 
  FaPhone, 
  FaEnvelope, 
  FaLocationDot,
  FaXTwitter
} from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white text-slate-600 dark:bg-slate-950 dark:text-slate-300 border-t border-slate-200 dark:border-slate-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="block dark:hidden">
                <Image src={LogoB} alt="CivicSocialPlus Logo" width={150} height={150} className="w-32 h-auto object-contain" />
              </div>
              <div className="hidden dark:block">
                <Image src={LogoW} alt="CivicSocialPlus Logo" width={150} height={150} className="w-32 h-auto object-contain" />
              </div>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              We are dedicated to making community service and social development events effortless and impactful. From local cleanups to winter clothing drives, we connect passionate volunteers with meaningful causes.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/upcoming-events" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/create-new-event" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Create Event
                </Link>
              </li>
              <li>
                <Link href="/manage-events" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Manage Events
                </Link>
              </li>
              <li>
                <Link href="/joined-events" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Joined Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4 tracking-wide">
              Core Initiatives
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/core-initiatives#community-cleanups" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Community Cleanups
                </Link>
              </li>
              <li>
                <Link href="/core-initiatives#tree-plantation-drives" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Tree Plantation Drives
                </Link>
              </li>
              <li>
                <Link href="/core-initiatives#winter-clothing-donation" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Winter Clothing Donation
                </Link>
              </li>
              <li>
                <Link href="/core-initiatives#youth-skill-workshops" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Youth Skill Workshops
                </Link>
              </li>
              <li>
                <Link href="/core-initiatives#food-distribution" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Food Distribution
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4 tracking-wide">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-3">
                <FaPhone className="w-4 h-4 text-emerald-600 dark:text-emerald-500 shrink-0" />
                <span>+880 1XXXX-XXXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="w-4 h-4 text-emerald-600 dark:text-emerald-500 shrink-0" />
                <span>hello@civicsocialplus.com</span>
              </li>
              <li className="flex items-start gap-3">
                <FaLocationDot className="w-4 h-4 text-emerald-600 dark:text-emerald-500 shrink-0 mt-1" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-900" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-slate-500">
            <p>© {currentYear} CivicSocialPlus. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy-policy" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <Link
              href="https://www.facebook.com/rumepervez"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-900 dark:hover:text-emerald-400 transition-all"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-4 h-4" />
            </Link>
            <Link
              href="https://github.com/Rumi-Parvez"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-900 dark:hover:text-emerald-400 transition-all"
              aria-label="GitHub"
            >
              <FaGithub className="w-4 h-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/rumi-parvez-dev"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-900 dark:hover:text-emerald-400 transition-all"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-4 h-4" />
            </Link>
            <Link
              href="https://x.com/openyhoolceo"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-900 dark:hover:text-emerald-400 transition-all"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="w-4 h-4" />
            </Link>
            <Link
              href="https://www.instagram.com/rumepervez"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-900 dark:hover:text-emerald-400 transition-all"
              aria-label="Instagram"
            >
              <FaInstagram className="w-4 h-4" />
            </Link>
            <Link
              href="https://youtube.com/@RumiParvez_Mystery"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-900 dark:hover:text-emerald-400 transition-all"
              aria-label="YouTube"
            >
              <FaYoutube className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}