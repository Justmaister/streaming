let fechas = {};
for (let serie of data.series) {
  let fields = serie.fields;
  let indiceField = fields.find(f => f.name === 'Indice');
  let fechaField = fields.find(f => f.name === 'Fecha');
  let asientoField = fields.find(f => f.name === 'Asiento_mm');

  for (let i = 0; i < indiceField.values.length; i++) {
    let indice = indiceField.values[i];
    let etiqueta = `N-${indice.toString().padStart(2, '0')} (mm)`;
    let fecha = fechaField.values[i];
    let asiento = asientoField.values[i];

    if (!fechas[fecha]) {
      fechas[fecha] = { x: [], y: [], text: [], name: fecha };
    }

    fechas[fecha].x.push(indice);
    fechas[fecha].y.push(asiento);
    fechas[fecha].text.push(etiqueta);
  }
}

let fechasOrdenadas = Object.keys(fechas).sort();
let lastFecha = fechasOrdenadas[fechasOrdenadas.length - 1];

let traces = fechasOrdenadas.map(fecha => {
  let serie = fechas[fecha];
  return {
    x: serie.x,
    y: serie.y,
    text: serie.text,
    hovertemplate: '%{text}<br>Asiento: %{y} mm<extra></extra>',
    type: 'scatter',
    mode: 'lines',
    name: serie.name,
    line: {
      dash: fecha === lastFecha ? 'dash' : 'solid'
    }
  };
});

return {
  data: traces,
  layout: {
    xaxis: {
      type: 'linear',
      tickmode: 'array',
      tickvals: Array.from({ length: 12 }, (_, i) => i + 1),
      ticktext: Array.from({ length: 12 }, (_, i) => `N-${String(i + 1).padStart(2, '0')} (mm)`),
      range: [0.5, 11.5],
      autorange: false,
      tickangle: 90
    },
    yaxis: {
      title: 'Asiento (mm)',
      dtick: 10,
      range: [-200, 20],
      autorange: false
    },
    legend: {
      orientation: 'h',
      y: -0.4,
      x: 0.5,
      xanchor: 'center',
      yanchor: 'top'
    },
    shapes: [
      {
        type: 'rect',
        xref: 'paper',
        x0: 0,
        x1: 1,
        yref: 'y',
        y0: -130,
        y1: 20,
        fillcolor: "rgba(23, 230, 34, 0.2)",
        line: {
          width: 0
        }
      },
      {
        type: 'rect',
        xref: 'paper',
        x0: 0,
        x1: 1,
        yref: 'y',
        y0: -160,
        y1: -130,
        fillcolor: "rgba(244, 153, 68, 0.5)",
        line: {
          width: 0
        }
      },
      {
        type: 'rect',
        xref: 'paper',
        x0: 0,
        x1: 1,
        yref: 'y',
        y0: -200,
        y1: -160,
        fillcolor: 'rgba(255, 0, 0, 0.5)',
        line: {
          width: 0
        }
      },
      {
        type: 'line',
        xref: 'x',
        x0: 4.5,
        x1: 4.5,
        yref: 'paper',
        y0: 0,
        y1: 1,
        line: {
          color: 'rgba(255, 165, 0, 0.65)',
          width: 2
        }
      },
      {
        type: 'line',
        xref: 'x',
        x0: 6,
        x1: 6,
        yref: 'paper',
        y0: 0,
        y1: 1,
        line: {
          color: 'rgba(255, 165, 0, 0.65)',
          width: 2
        }
      },
      {
        type: 'line',
        xref: 'x',
        x0: 7.5,
        x1: 7.5,
        yref: 'paper',
        y0: 0,
        y1: 1,
        line: {
          color: 'rgba(255, 165, 0, 0.65)',
          width: 2
        }
      }
    ],
    annotations: [
      {
        xref: 'paper',
        x: 0.045,
        yref: 'y',
        y: -130,
        text: 'UMBRAL 0',
        showarrow: false,
        yanchor: 'top',
        xanchor: 'left',
        font: {
          color: 'rgba(255, 165, 0, 0.65)',
          size: 12,
        }
      },
      {
        xref: 'paper',
        x: 0.045,
        yref: 'y',
        y: -160,
        text: 'UMBRAL 1',
        showarrow: false,
        yanchor: 'top',
        xanchor: 'left',
        font: {
          color: 'rgba(255, 0, 0, 0.65)',
          size: 12,
        }
      },
      {
        x: 4.5,
        y: 0,
        xref: 'x',
        yref: 'x',
        text: 'P-22',
        showarrow: false,
        xanchor: 'right',
        yanchor: 'top',
        textangle: -90,
        font: {
          size: 10,
          color: 'rgba(255, 165, 0, 0.65)'
        }
      },
      {
        x: 6,
        y: 0,
        xref: 'x',
        yref: 'y',
        text: 'P-21',
        xanchor: 'right',
        yanchor: 'top',
        showarrow: false,
        textangle: -90,
        font: {
          size: 10,
          color: 'rgba(255, 165, 0, 0.65)'
        }
      },
      {
        x: 7.5,
        y: -0,
        xref: 'x',
        yref: 'y',
        text: 'P-20',
        xanchor: 'right',
        yanchor: 'top',
        showarrow: false,
        textangle: -90,
        font: {
          size: 10,
          color: 'rgba(255, 165, 0, 0.65)'
        }
      }
    ]
  }
};
