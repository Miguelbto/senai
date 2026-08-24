import { StatusBar } from 'expo-status-bar';
import ListaTarefasScreen from './src/screens/ListaTarefasScreen';

export default function App() {
  return (
    <>
      <ListaTarefasScreen />
      <StatusBar style="auto" />
    </>
  );
}
