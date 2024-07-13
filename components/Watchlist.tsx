import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { View } from './Themed';
import { Card } from './Card';
import { ITrade } from '@/utils/store/useStore';

export default function Watchlist({ data }: { data: ITrade[] }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => <Card {...item} />}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  itemSeparator: {
    marginVertical: 6,
  }
});
