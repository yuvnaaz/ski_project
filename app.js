import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const image = {
  uri: 'https://images.ctfassets.net/hrltx12pl8hq/5thrWp3Se4mcffFgMORIds/9013edc6afcdfe220a7334eb49d81b9d/snow-images.jpg?fit=fill&w=600&h=400',
};

const App = () => {
  const [data, setData] = useState(null);
  const [visibleResort, setVisibleResort] = useState(null);
  const [data1, setData1] = useState(null);

  useEffect(() => {
    fetchData();
    fetchData1();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData1 = async () => {
    try {
      const response1 = await fetch('http://127.0.0.1:3000');
      const jsonData1 = await response1.json();
      setData1(jsonData1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleResortData = (resortName) => {
    if (visibleResort === resortName) {
      setVisibleResort(null); // Hide the data if the same button is clicked again
    } else {
      setVisibleResort(resortName); // Show the data for the clicked resort
    }
  };

  const renderChart = (selectedResort) => {
    if (!selectedResort) {
      return null;
    }

    const chartData = {
      labels: ['Snowfall', 'Base Depth', 'Open Trails'],
      datasets: [
        {
          data: [
            parseFloat(selectedResort['Snowfall 24h24h']) || 0,
            parseFloat(selectedResort[`Base DepthBase`]) || 0,
            parseInt(selectedResort['Open TrailsTrails']) || 0,
          ],
        },
      ],
    };

    return (
      <View>
        <Text>Chart for: {selectedResort.ResortName}</Text>
        <BarChart
          data={chartData}
          width={350}
          height={220}
          yAxisSuffix=""
          fromZero
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
        />
      </View>
    );
  };

  return (
    <ImageBackground source={image} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {data1 && (
          <View style={styles.data1Container}>
            <Text style={styles.data1Header}>Snowpack Information</Text>
            <View style={styles.data1Content}>
              {Object.entries(data1).map(([key, value]) => (
                <View key={key} style={styles.data1Item}>
                  <Text style={styles.data1Label}>{key}:</Text>
                  <Text style={styles.data1Value}>{value}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        {data &&
          data.map((resortData, index) => (
            <View key={index} style={styles.resortContainer}>
              {Object.entries(resortData).map(([resortName, resortInfo]) => (
                <View key={resortName}>
                  <Button
                    title={resortName}
                    style={styles.resortButton}
                    onPress={() => toggleResortData(resortName)}
                  />
                  {visibleResort === resortName && (
                    <View>
                      {renderChart(resortInfo)}
                      <View style={styles.resortDataContainer}>
                        {Object.entries(resortInfo).map(([key, value]) => (
                          <View key={key} style={styles.dataContainer}>
                            <Text style={styles.label}>{key}:</Text>
                            <Text style={styles.value}>{value}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>
          ))}
      </ScrollView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  data1Container: {
    marginBottom: 20,
  },
  data1Header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff', // Change the color as needed
  },
  data1Content: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  data1Item: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  data1Label: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#000', // Change the color as needed
  },
  data1Value: {
    flex: 1,
    color: '#000', // Change the color as needed
  },
  resortContainer: {
    marginBottom: 20,
  },
  resortButton: {
    marginBottom: 10,
    width: 200,
    height: 40,
    backgroundColor: '#fff', // Change the background color as needed
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resortDataContainer: {
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  dataContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#000', // Change the color as needed
  },
  value: {
    flex: 1,
    color: '#000', // Change the color as needed
  },
});

export default App