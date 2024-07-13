import { useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import { ITrade, useStore } from '@/utils/store/useStore';
import { FontAwesome } from '@expo/vector-icons';

export function Card({ p, symbol, displaySymbol, origPrice, alertPrice }: ITrade) {
  const currentPrice = p;
  const originalPrice = origPrice ?? p;
  const priceDiff = currentPrice - originalPrice;
  const percentageDiff = (priceDiff / originalPrice) * 100;
  const positiveDiff = priceDiff >= 0;

  const { removeAlert } = useStore();

  const formatNumber = (num: number): string => {
    if (Number.isInteger(num)) {
      return num.toString();
    } else {
      return num.toFixed(2);
    }
  };

  useEffect(() => {
    if (alertPrice && (currentPrice >= alertPrice)) {
      Alert.alert(
        'Alert',
        `Price for ${displaySymbol} has reached ${alertPrice}`,
        [{ text: 'OK', onPress: () => removeAlert(symbol) }],
        { cancelable: false }
      );
    };
  }, [alertPrice]);

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, {
        justifyContent: 'space-between',
        marginBottom: 6,
      }]}>
        <Text style={styles.title}>{displaySymbol}</Text>
        <Text style={styles.title}>{formatNumber(currentPrice)}</Text>
      </View>
      <View style={[styles.container, { justifyContent: 'space-between' }]}>
        <View style={styles.container}>
          <FontAwesome
            size={28}
            name={positiveDiff ? 'angle-up' : 'angle-down'}
            color={positiveDiff ? 'green' : 'red'}
          />
          <Text
            style={[styles.subtitle, { color: positiveDiff ? 'green' : 'red' }]}
          >
            {formatNumber(percentageDiff)}% ({formatNumber(priceDiff)})
          </Text>
        </View>
        {alertPrice && (
          <View style={styles.container}>
            <FontAwesome
              size={16}
              name={'bell'}
              color={'#333'}
            />
            <Text style={[styles.subtitle, { marginLeft: 8 }]}>{alertPrice ?? 0}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    backgroundColor: '#eff3f8',
    borderRadius: 4,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
});
