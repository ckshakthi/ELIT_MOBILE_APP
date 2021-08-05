import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {LineChart, ProgressChart,BarChart} from 'react-native-chart-kit';
import ProgressCircle from 'react-native-progress-circle';
import {Card} from 'react-native-elements';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryTooltip,
} from 'victory-native';

const lineConfig = {
  backgroundColor: '#FFF',
  backgroundGradientFrom: '#FFF',
  backgroundGradientTo: '#FFF',
  decimalPlaces: 2,
  color: (opacity = 0) => `rgba(255,0,0, ${opacity})`,
  labelColor: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: 'red',
  },
};

const chartConfig = {
  backgroundColor: '#FFF',
  backgroundGradientFrom: '#FFF',
  backgroundGradientTo: '#FFF',
  color: (opacity = 0) => `rgba(33, 246, 15, ${opacity})`,
  labelColor: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const data = [
  {quarter: 1, earnings: 3000},
  {quarter: 2, earnings: 6500},
  {quarter: 3, earnings: 8500},
  {quarter: 4, earnings: 11200},
];

export const Cards = props => {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: props.bg,
      }}>
      <View style={styles.col}>
        <View style={{marginLeft: 70}}>
          <ProgressCircle
            percent={props.percent}
            radius={35}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999">
            <Text style={{fontSize: 18}}></Text>
          </ProgressCircle>
        </View>
      </View>
      <Text style={styles.title}>{props.title}</Text>
      <Text
        style={{
          ...styles.number,
          color: props.bg == 'red' ? '#FFF' : '#000',
        }}>
        {props.number}
      </Text>
    </View>
  );
};

export const Linechart = props => {
  return (
    <Card>
      <Card.Title>{props.Title}</Card.Title>
      {/* <Card.Title>{'Line Chart'}</Card.Title> */}
      <View
        style={{
          marginTop: 40,
        }}>
        <LineChart
          data={props.data}
          width={props.width}
          height={props.height}
          yAxisSuffix="k"
          yAxisInterval={1}
          chartConfig={lineConfig}
          bezier
          style={{borderRadius: 16}}
          verticalLabelRotation={30}
        />
      </View>
    </Card>
  );
};

export const Progreschart = ({...props}) => {
  return (
    <Card>
      <Card.Title>{props.Title}</Card.Title>
      <View style={{marginTop: 40}}>
      <ProgressChart
        data={props.data}
        width={props.width}
        height={props.height}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
        backgroundTint="#3333ff"
        style={{borderRadius: 16}}
      />
      </View>
    </Card>
  );
};

export const Barchart = props => {
  return (
    <Card>
      <Card.Title>{props.Title}</Card.Title>
      <BarChart 
             style={{paddingLeft:0}}
            data={props.data}
            width={props.width}
            height={props.height}
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            withHorizontalLabels={false}
            yAxisLabel="$"
            style={{borderRadius: 16}}
          // fromZero={true}
          // withCustomBarColorFromData={true}
          // flatColor={true}
          // withInnerLines={false}
          // showBarTops={false}
          // showValuesOnTopOfBars={true}
        />
      {/* <BarChart
        yAxisLabel="$"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        // style={props.style}
        // data={props.data}
        // width={props.width}
        // height={props.height}
        // //yAxisLabel="$"
        // chartConfig={chartConfig}
        // verticalLabelRotation={30}
      /> */}
    </Card>
  );
};

export const Harizontalbarchart = props => {
  return (
    <Card>
      <Card.Title>{props.Title}</Card.Title>
      <View style={{backgroundColor: '#FFF', marginTop: 40, borderRadius: 16}}>
        <VictoryChart
          domainPadding={20}
          theme={VictoryTheme.material}
          animate={{duration: 500}}>
          <VictoryAxis
            tickValues={[1, 2, 3, 4]}
            tickFormat={['2018', '2019', '2020', '2021']}
          />
          <VictoryAxis dependentAxis tickFormat={x => `${x / 1000}K`} />
          <VictoryBar
            horizontal
            data={data}
            x="quarter"
            y="earnings"
            //labels={({ datum }) => `y: ${datum.y}`}
            labelComponent={<VictoryTooltip style={{fill: 'tomato'}} />}
            style={{data: {fill: 'tomato', width: 12}}}
            animate={{
              onExit: {
                duration: 500,
                before: () => ({
                  _y: 0,
                  fill: 'orange',
                  label: 'data',
                }),
              },
            }}
          />
        </VictoryChart>
      </View>
    </Card>
  );
};
//==================== Style Sheets ========================
const styles = StyleSheet.create({
  container: {
    height: 160,
    width: 160,
    borderRadius: 30,
    padding: 10,
    marginLeft: 15,
  },
  col: {
    flexDirection: 'row',
  },
  title: {
    marginTop: 10,
    color: '#b8b8aa',
    fontWeight: 'bold',
    fontSize: 25,
  },
  number: {
    fontWeight: 'bold',
    fontSize: 22,
  },
});
