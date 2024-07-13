import React, { useEffect, useState } from 'react';
import { Text, View } from './Themed';
import { Dimensions, StyleSheet } from 'react-native';
import { useStore } from '@/utils/store/useStore';
import { BarChart } from "react-native-gifted-charts";
import Colors from '@/constants/Colors';

interface IData {
  value: number;
  label: string;
}

const windowHeight = Dimensions.get('window').height;

export default function Chart() {
  const trades = useStore((state) => state.trades);
  const [data, setData] = useState<IData[]>([])

  useEffect(() => {
    const chartData: IData[] = trades.map((trade) => ({
      value: trade.p,
      label: trade.displaySymbol,
    }));
    setData(chartData);
  }, [trades]);

  return (
    <BarChart
      data={data}
      height={windowHeight * 0.5}
      barWidth={18}
      rulesType='dashed'
      rulesColor={'#d8d8d8'}
      frontColor={Colors.light.tint}
      xAxisColor={Colors.light.tabIconDefault}
      yAxisColor={Colors.light.tabIconDefault}
      barBorderTopLeftRadius={8}
      barBorderTopRightRadius={8}
      renderTooltip={(value: IData) => (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>
            {value.label}:
          </Text>
          <Text style={styles.tooltipText}>
            {value.value}
          </Text>
        </View>
      )}
      leftShiftForLastIndexTooltip={50}
    />
  );
}

const styles = StyleSheet.create({
  tooltip: {
    padding: 6,
    borderRadius: 4,
    backgroundColor: Colors.light.tabIconDefault,
  },
  tooltipText: {
    color: Colors.light.text,
  }
});
