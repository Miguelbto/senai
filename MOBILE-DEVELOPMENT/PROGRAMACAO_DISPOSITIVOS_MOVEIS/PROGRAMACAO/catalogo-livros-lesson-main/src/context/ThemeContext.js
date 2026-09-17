import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@pagina_virada:tema';

const temaClaro = {
  background: '#F8F9FA',
  card: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  primary: '#2563EB',
  primaryText: '#FFFFFF',
  border: '#E5E7EB',
  error: '#DC2626',
  success: '#16A34A',
  tabBar: '#FFFFFF',
  header: '#2563EB',
  headerText: '#FFFFFF',
};

const temaEscuro = {
  background: '#0F172A',
  card: '#1E293B',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  primary: '#3B82F6',
  primaryText: '#FFFFFF',
  border: '#334155',
  error: '#F87171',
  success: '#4ADE80',
  tabBar: '#1E293B',
  header: '#1E293B',
  headerText: '#F1F5F9',
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [modoEscuro, setModoEscuro] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((valor) => {
      if (valor !== null) setModoEscuro(valor === 'escuro');
    });
  }, []);

  function alternarTema() {
    const novoModo = !modoEscuro;
    setModoEscuro(novoModo);
    AsyncStorage.setItem(STORAGE_KEY, novoModo ? 'escuro' : 'claro');
  }

  const cores = modoEscuro ? temaEscuro : temaClaro;

  return (
    <ThemeContext.Provider value={{ modoEscuro, alternarTema, cores }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTema() {
  return useContext(ThemeContext);
}
