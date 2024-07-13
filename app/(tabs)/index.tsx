import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Card } from '@/components/Card';
import { useFinnhubWebSocket } from '@/utils/hooks/useFinnhubWebSocket';
import { useCryptoSymbols } from '@/utils/queries';
import Watchlist from '@/components/Watchlist';

export default function TabOneScreen() {
  const { data, status } = useFinnhubWebSocket();
  const { loading } = useCryptoSymbols()

  if (loading) return <ActivityIndicator />

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Watchlist</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {["pending", "connected"].includes(status) && <ActivityIndicator />}
      {status === "error" && <Text>Error</Text>}
      {status === "closed" && <Text>closed</Text>}
      {status === "active" && <Watchlist data={data} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 18,
    height: 1,
    width: '80%',
  },
});
