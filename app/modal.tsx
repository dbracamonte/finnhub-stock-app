import { useEffect, useState } from 'react';
import { Button, Platform, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
import { StatusBar } from 'expo-status-bar';
import RNPickerSelect from 'react-native-picker-select';
import { useStore } from '@/utils/store/useStore';
import { ICryptoSymbol } from '@/utils/queries';
import { useFinnhubWebSocket } from '@/utils/hooks/useFinnhubWebSocket';

export default function ModalScreen() {
  const { subscribe, unsubscribe } = useFinnhubWebSocket();

  const symbols = useStore((state) => state.symbols);
  const trades = useStore((state) => state.trades);
  const watchlist = useStore((state) => state.watchlist);
  const { addAlert } = useStore();

  const [selected, setSelected] = useState<ICryptoSymbol | null>(null);
  const [isOnWatchlist, setIsOnWatchlist] = useState<boolean | null>(null);
  const [inputValue, setInputVale] = useState('');

  const items = symbols.map((symbol: ICryptoSymbol) => ({
    label: symbol.displaySymbol,
    value: symbol.symbol,
  }));

  const handleSelect = (value: string) => {
    if (value) {
      const _selected = symbols.find((symbol) => symbol.symbol === value) ?? null;
      const _isOnWatchlist = watchlist.some((trade) => trade.symbol === value);
      setSelected(_selected);
      setIsOnWatchlist(_isOnWatchlist);
    }
  }

  const handleSubscribe = (selected: ICryptoSymbol) => {
    if (isOnWatchlist) {
      unsubscribe(selected.symbol);
      setIsOnWatchlist(false);
      setInputVale('');
      return;
    }
    subscribe(selected.symbol);
    setIsOnWatchlist(true);
    setInputVale('');
  }

  const handleChangeText = (input: string) => {
    if (input === '.') return;

    const formattedInput = input.replace(/[^0-9.]/g, '');

    const parts = formattedInput.split('.');

    if (parts.length > 2) {
      setInputVale(parts[0] + '.' + parts.slice(1).join(''));
    } else {
      setInputVale(formattedInput);
    }
  };

  useEffect(() => {
    if (selected) {
      const _trade = trades.find((trade) => trade.s === selected.symbol);
      setInputVale(_trade?.alertPrice?.toString() ?? '');
    }
  }, [selected]);

  const handleAlert = (symbol: string) => {
    addAlert(symbol, parseFloat(inputValue));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Selecciona una crypto para iniciar la configuración.</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <RNPickerSelect
        onValueChange={handleSelect}
        items={items}
      />

      {selected && (
        <View style={styles.selected}>
          <Button
            color={isOnWatchlist ? 'red' : 'green'}
            onPress={() => handleSubscribe(selected)}
            title={isOnWatchlist ? 'Remover de watchlist' : 'Agregar a watchlist'}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Puedes agregar alertas de tus cryptos favoritas</Text>
            <TextInput
              style={[styles.input, { borderColor: !isOnWatchlist ? 'red' : 'gray' }]}
              onChangeText={handleChangeText}
              value={inputValue}
              placeholder="0,00"
              keyboardType="numeric"
              editable={!!isOnWatchlist}
            />
            {inputValue && (
              <Button
                onPress={() => handleAlert(selected.symbol)}
                title='Agregar aletar'
              />
            )}
          </View>
        </View>
      )}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 18,
    height: 1,
    width: '80%',
  },
  selected: {
    marginTop: 30,
  },
  inputContainer: {
    marginTop: 24,
  },
  input: {
    height: 40,
    marginTop: 18,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    borderColor: 'gray',
  },
  inputDisabled: {
    borderColor: 'red',
  }
});
