# Real-Time Data Streaming and Visualization Project

This project demonstrates a real-time data streaming pipeline that collects sensor data from an OPC-UA server, stores it in InfluxDB3, and visualizes it in Grafana with alerting capabilities.

## Architecture Overview

The system consists of the following components:
- **Mock OPC-UA Server** (`mock-opc-ua.py`): Generates simulated sensor data (temperature, wind speed, and other metrics)
- **Telegraf**: Collects data from the OPC-UA server and forwards it to InfluxDB3
- **InfluxDB3**: Time-series database that stores the sensor data
- **Grafana**: Real-time visualization and alerting dashboard

## Prerequisites

- Linux instance (required for running InfluxDB3 and Telegraf)
- Docker (for running InfluxDB Explorer)
- Python 3.x
- Telegraf installed on Linux

## Setup Instructions

### 1. Start InfluxDB3 Server

On your Linux instance, run the following command to start InfluxDB3:

```bash
influxdb3 serve \
  --node-id host01 \
  --object-store file \
  --data-dir ~/.influxdb3 \
  --http-bind 0.0.0.0:8282 \
  --verbose \
  --log-filter info \
  --without-auth
```

This will start InfluxDB3 on port 8282 without authentication. Keep this terminal session running.

### 2. Run the Mock OPC-UA Server

The `mock-opc-ua.py` script simulates an OPC-UA server that sends sensor data. To run it:

#### Create a Virtual Environment

```bash
python3 -m venv venv
```

#### Activate the Virtual Environment

```bash
source venv/bin/activate
```

#### Install Required Packages

```bash
pip install -r requirements.txt
```

#### Run the Mock OPC-UA Server

```bash
python mock-opc-ua.py
```

This will start the OPC-UA server on `opc.tcp://127.0.0.1:4840` and begin sending simulated sensor data (Temperature_1, Wind_1, N-01, Temperature_2, Wind_2, N-02) every 5 seconds. Keep this terminal session running.

### 3. Start Telegraf

On your Linux instance, configure Telegraf to use the `telegraf.conf` file, then start the service:

```bash
sudo systemctl restart telegraf
sudo systemctl status telegraf
```

Telegraf will collect data from the OPC-UA server and forward it to InfluxDB3. Verify that the service is running correctly with the status command.

### 4. Access InfluxDB Explorer (Optional)

To view and explore the data in InfluxDB, run the InfluxDB Explorer in a Docker container:

```bash
docker run --detach \
  --name influxdb3-explorer \
  --publish 8888:80 \
  --publish 8889:8888 \
  influxdata/influxdb3-ui \
  --mode=admin
```

Access the InfluxDB Explorer at `http://localhost:8888` in your web browser.

### 5. Connect Grafana for Real-Time Visualization

Connect Grafana to your InfluxDB3 instance to visualize the sensor data in real time:

1. Add InfluxDB3 as a data source in Grafana
2. Configure the connection using the InfluxDB3 endpoint (e.g., `http://your-server-ip:8282`)
3. Create dashboards to visualize the sensor metrics
4. Set up alerts to notify when sensor values exceed predefined thresholds

#### Setting Up Alerts

In Grafana, you can configure alerts for each sensor metric:
- **Temperature Alerts**: Set thresholds for high/low temperature values
- **Wind Speed Alerts**: Configure alerts for wind speed limits
- **Custom Thresholds**: Define alert rules for any sensor metric (N-01, N-02, etc.)

When a sensor value goes beyond the configured threshold, Grafana will trigger the alert and send notifications through your configured channels (email, Slack, etc.).

## Data Flow

1. **Mock OPC-UA Server** generates sensor data every 5 seconds
2. **Telegraf** collects the data from the OPC-UA server endpoint
3. **InfluxDB3** stores the time-series data
4. **Grafana** queries InfluxDB3 and displays real-time visualizations
5. **Alerts** are triggered when sensor values exceed thresholds

## Configuration

- **Telegraf Configuration**: Edit `telegraf.conf` to modify collection intervals, OPC-UA endpoints, or InfluxDB connection settings
- **OPC-UA Server**: Modify `mock-opc-ua.py` to change sensor types, data ranges, or update intervals
- **InfluxDB**: Adjust the InfluxDB3 startup command to change ports, data directory, or other settings

## Notes

- Ensure all services are running simultaneously for the complete data pipeline to function
- The OPC-UA server must be running before starting Telegraf
- InfluxDB3 must be running before Telegraf can send data to it
- Make sure firewall rules allow connections on the required ports (4840 for OPC-UA, 8282 for InfluxDB3)
