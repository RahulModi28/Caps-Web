"use client";

import React, { useState } from "react";
import { Mail, Phone, Clock, Send, CheckCircle2, AlertTriangle, Building } from "lucide-react";
import { campuses } from "@/config/data";

interface FormData {
  name: string;
  email: string;
  role: string;
  campus: string;
  category: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    role: "Student",
    campus: "Central Campus",
    category: "General Inquiry",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Full Name is required.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email Address is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message cannot be empty.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error message when user starts typing again
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setServerMessage(result.message);
        // Reset form data except defaults
        setFormData({
          name: "",
          email: "",
          role: "Student",
          campus: "Central Campus",
          category: "General Inquiry",
          message: "",
        });
      } else {
        setStatus("error");
        setServerMessage(result.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setServerMessage("Failed to send message. Please check your network connection and try again.");
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-950 relative" id="contact">
      {/* Background spotlights */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-primary-navy/5 dark:bg-primary-navy/2 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent-gold/5 dark:bg-accent-gold/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact details & information */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <span className="text-accent-gold font-bold text-xs uppercase tracking-widest bg-accent-gold/10 px-3 py-1.5 rounded-full dark:bg-accent-gold/5 inline-flex items-center gap-1.5">
                <Building className="h-3 w-3" />
                Connect With Us
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary-navy dark:text-slate-100 mt-4 tracking-tight">
                We&apos;d Love to Hear From You
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
                Have questions about CAPS programs, workshops, peer training or psychometric tests? Write to us or visit our central offices across any of Christ University campuses.
              </p>

              {/* Direct Details Cards */}
              <div className="mt-8 space-y-6">
                {/* Email Address */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-accent-gold shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Email Queries</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      For general and coordination questions:
                    </p>
                    <a 
                      href="mailto:caps@christuniversity.in"
                      className="text-sm font-semibold text-primary-navy dark:text-accent-gold hover:underline mt-1 inline-block"
                    >
                      caps@christuniversity.in
                    </a>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-accent-gold shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Contact Number</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      Christ University General Desk:
                    </p>
                    <a 
                      href="tel:+918040129100" 
                      className="text-sm font-semibold text-primary-navy dark:text-accent-gold hover:underline mt-1 inline-block"
                    >
                      +91 80 4012 9100
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-accent-gold shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Office Timings</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      Monday to Friday: 9:00 AM – 4:00 PM
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Saturday: 9:00 AM – 1:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Locations Note */}
            <div className="mt-10 p-5 bg-slate-50 dark:bg-secondary-dark-slate rounded-2xl border border-slate-100 dark:border-slate-800/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Central Office Locations
              </h4>
              <ul className="mt-3 space-y-2.5 text-xs text-slate-600 dark:text-slate-350">
                {campuses
                  .filter((c) => c.status === "Publish")
                  .map((campus) => (
                    <li key={campus.name} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 bg-accent-gold rounded-full mt-1.5 shrink-0" />
                      <span>
                        <strong className="text-slate-800 dark:text-slate-200 font-semibold">{campus.name}:</strong>{" "}
                        {campus.officeAddress}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 dark:bg-secondary-dark-slate rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-800/80 shadow-md">
              
              {status === "success" ? (
                /* Success Layout */
                <div className="text-center py-10 flex flex-col items-center animate-fade-in" role="alert">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 border border-emerald-200 dark:border-emerald-900">
                    <CheckCircle2 className="h-10 w-10 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-md mx-auto text-sm leading-relaxed">
                    {serverMessage}
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 px-6 py-2.5 bg-primary-navy dark:bg-accent-gold text-white dark:text-secondary-dark-slate font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent-gold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* Form Layout */
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {status === "error" && (
                    <div 
                      className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/60 rounded-2xl flex items-start gap-3 text-rose-700 dark:text-rose-400 text-sm animate-fade-in"
                      role="alert"
                    >
                      <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold">Submission Failed</h4>
                        <p className="mt-0.5">{serverMessage}</p>
                      </div>
                    </div>
                  )}

                  {/* Grid for Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-name" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Full Name <span className="text-rose-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="form-name"
                        name="name"
                        type="text"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold transition-colors ${
                          errors.name 
                            ? "border-rose-300 dark:border-rose-900 focus:ring-rose-500" 
                            : "border-slate-200 dark:border-slate-800"
                        }`}
                        placeholder="John Doe"
                        disabled={status === "submitting"}
                      />
                      {errors.name && (
                        <span id="name-error" className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-email" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Email Address <span className="text-rose-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="form-email"
                        name="email"
                        type="email"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold transition-colors ${
                          errors.email 
                            ? "border-rose-300 dark:border-rose-900 focus:ring-rose-500" 
                            : "border-slate-200 dark:border-slate-800"
                        }`}
                        placeholder="john.doe@example.com"
                        disabled={status === "submitting"}
                      />
                      {errors.email && (
                        <span id="email-error" className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Role, Campus, Query Category (Three Selects in a grid) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Role Selector */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-role" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        I am a
                      </label>
                      <select
                        id="form-role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold"
                        disabled={status === "submitting"}
                      >
                        <option value="Student">Student</option>
                        <option value="Faculty">Faculty</option>
                        <option value="Alumni">Alumni</option>
                        <option value="Parent">Parent</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Campus Selector */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-campus" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        My Campus
                      </label>
                      <select
                        id="form-campus"
                        name="campus"
                        value={formData.campus}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold"
                        disabled={status === "submitting"}
                      >
                        <option value="Central Campus">Central Campus</option>
                        <option value="Bannerghatta Road Campus">Bannerghatta Road Campus</option>
                        <option value="Kengeri Campus">Kengeri Campus</option>
                        <option value="Yeshwanthpur Campus">Yeshwanthpur Campus</option>
                        <option value="Pune Lavasa">Pune Lavasa</option>
                        <option value="Delhi NCR">Delhi NCR</option>
                      </select>
                    </div>

                    {/* Category Selector */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-category" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Query Category
                      </label>
                      <select
                        id="form-category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold"
                        disabled={status === "submitting"}
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Request a Session">Request a Session</option>
                        <option value="Voluntary Opportunities">Voluntary Opportunities</option>
                        <option value="Industry Collaboration">Industry Collaboration</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-message" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Message / Inquiry Details <span className="text-rose-500" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold transition-colors resize-none ${
                        errors.message 
                          ? "border-rose-300 dark:border-rose-900 focus:ring-rose-500" 
                          : "border-slate-200 dark:border-slate-800"
                      }`}
                      placeholder="Write your message details here..."
                      disabled={status === "submitting"}
                    />
                    {errors.message && (
                      <span id="message-error" className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full sm:w-auto px-8 py-3.5 bg-primary-navy dark:bg-accent-gold hover:opacity-95 text-white dark:text-secondary-dark-slate font-extrabold text-sm rounded-xl cursor-pointer shadow-lg shadow-primary-navy/10 dark:shadow-accent-gold/5 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white dark:border-secondary-dark-slate border-t-transparent rounded-full animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
