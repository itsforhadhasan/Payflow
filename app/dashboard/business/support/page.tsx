'use client';

import { ArrowLeft, Phone, Mail, MessageCircle, HelpCircle, ChevronDown, ChevronUp, FileText, Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function BusinessSupportPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'agent', text: 'Hello! Welcome to PayFlow Business Support. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { sender: 'user', text: input }]);
        setInput('');
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'agent', text: 'Thank you for your message. An agent will be with you shortly.' }]);
        }, 1000);
    };

    const faqs = [
        {
            q: "How can I increase my daily transaction limit?",
            a: "To increase your limit, please submit a request through the 'Business Settings' page or contact your dedicated relationship manager. Changes usually take 24-48 hours."
        },
        {
            q: "Where can I find my API credentials?",
            a: "Navigate to 'Business Settings' > 'API & Integration'. You will find your Public and Secret keys there. Keep them secure."
        },
        {
            q: "How do I process a refund?",
            a: "Go to the 'Refund' section from the dashboard, enter the Transaction ID, and specify the amount. Refunds are processed instantly if funds are available."
        },
        {
            q: "What are the settlement timings?",
            a: "Settlements are processed automatically every banking day at 12:00 PM. Funds usually reflect in your bank account within 1-2 business days."
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] font-sans pb-12">
            {/* Header */}
            <div className="bg-white dark:bg-[#1e293b] sticky top-0 z-30 border-b border-gray-100 dark:border-slate-800">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="h-16 flex items-center gap-4">
                        <Link href="/dashboard/business" className="p-2 -ml-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </Link>
                        <h1 className="text-lg font-bold text-gray-800 dark:text-white">Support Center</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

                {/* Contact Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Hotline */}
                    <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/20 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 backdrop-blur-sm">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-lg mb-1">24/7 Hotline</h3>
                            <p className="text-indigo-100 text-sm mb-4">Urgent support anytime.</p>
                            <a href="tel:16247" className="inline-block text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">16247</a>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800 group hover:border-indigo-100 dark:hover:border-indigo-900/50 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center mb-4 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-1">Email Support</h3>
                        <p className="text-gray-500 dark:text-slate-400 text-sm mb-4">Response within 24 hours.</p>
                        <a href="mailto:business@payflow.com" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">business@payflow.com</a>
                    </div>

                    {/* Live Chat */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800 group hover:border-indigo-100 dark:hover:border-indigo-900/50 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                            <MessageCircle className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-1">Live Chat</h3>
                        <p className="text-gray-500 dark:text-slate-400 text-sm mb-4">Chat with a real agent.</p>
                        <button onClick={() => setIsChatOpen(true)} className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors">Start Chat</button>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600">
                            <HelpCircle className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Frequently Asked Questions</h3>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-100 dark:border-slate-800 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-4 bg-gray-50/50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-left"
                                >
                                    <span className="font-bold text-gray-700 dark:text-gray-200 text-sm">{faq.q}</span>
                                    {openFaq === index ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                                </button>
                                {openFaq === index && (
                                    <div className="p-4 bg-white dark:bg-[#1e293b] text-sm text-gray-600 dark:text-slate-400 leading-relaxed border-t border-gray-100 dark:border-slate-800">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>


                {/* Floating Chat Widget */}
                {isChatOpen && (
                    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden z-50 flex flex-col max-h-[500px]">
                        <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <h3 className="font-bold">Live Support</h3>
                            </div>
                            <button onClick={() => setIsChatOpen(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                                <ChevronDown className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 dark:bg-slate-900/50 min-h-[300px]">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-3 bg-white dark:bg-[#1e293b] border-t border-gray-100 dark:border-slate-800 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type a message..."
                                className="flex-1 bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-600/20"
                            />
                            <button onClick={handleSend} className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
