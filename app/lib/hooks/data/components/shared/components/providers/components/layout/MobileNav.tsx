"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, ChevronDown, Brain, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
  children?: NavLink[];
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  pathname: string;
}

export function MobileNav({ isOpen, onClose, navLinks, pathname }: MobileNavProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href) ? prev.filter((h) => h !== href) : [...prev, href]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-eagle-gray-900 z-50 lg:hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-eagle-gray-100 dark:border-eagle-gray-800">
              <Link href="/" className="flex items-center gap-2" onClick={onClose}>
                <div className="w-8 h-8 rounded-lg bg-eagle-green flex items-center justify-center text-white">
                  <Brain className="w-5 h-5" />
                </div>
                <span className="font-bold font-display text-eagle-slate dark:text-white">
                  Eagle's Lab
                </span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-eagle-gray-100 dark:hover:bg-eagle-gray-800 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-eagle-gray-600 dark:text-eagle-gray-400" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
              <div className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.children ? (
                      <div>
                        <button
                          onClick={() => toggleExpand(link.href)}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                            pathname === link.href || pathname.startsWith(link.href + "/")
                              ? "text-eagle-green dark:text-eagle-green-light bg-eagle-green/5 dark:bg-eagle-green/10"
                              : "text-eagle-gray-700 dark:text-eagle-gray-300 hover:bg-eagle-gray-50 dark:hover:bg-eagle-gray-800"
                          )}
                        >
                          {link.label}
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-200",
                              expandedItems.includes(link.href) && "rotate-180"
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {expandedItems.includes(link.href) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 mt-1 space-y-1">
                                {link.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={onClose}
                                    className={cn(
                                      "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-colors",
                                      pathname === child.href
                                        ? "text-eagle-green dark:text-eagle-green-light bg-eagle-green/5 dark:bg-eagle-green/10"
                                        : "text-eagle-gray-600 dark:text-eagle-gray-400 hover:text-eagle-green dark:hover:text-eagle-green-light hover:bg-eagle-gray-50 dark:hover:bg-eagle-gray-800"
                                    )}
                                  >
                                    <ChevronRight className="w-3 h-3" />
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                          pathname === link.href
                            ? "text-eagle-green dark:text-eagle-green-light bg-eagle-green/5 dark:bg-eagle-green/10"
                            : "text-eagle-gray-700 dark:text-eagle-gray-300 hover:bg-eagle-gray-50 dark:hover:bg-eagle-gray-800"
                        )}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6 pt-6 border-t border-eagle-gray-100 dark:border-eagle-gray-800">
                <Link
                  href="/join"
                  onClick={onClose}
                  className="block w-full text-center px-6 py-3 bg-eagle-green text-white font-medium rounded-lg hover:bg-eagle-green-dark transition-colors"
                >
                  Join the Lab
                </Link>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}