(function(dimple) {
  var data = d3.csv("./leoka-summary-kills.csv", function (data) {
  
  var svg = d3.select('#area_chart').append('svg')
              .attr('width', 700)
              .attr('height', 500);

  var total_area = d3.svg.area()
                    .x(function(d) { return x(d.year); })
                    .y0(500)
                    .y1(function(d) { return y(d.kills); });

  var total_line = d3.svg.line()
                    .x(function(d) { return d.year })
                    .y(function(d) { return d.kills })

  var x = d3.scale.linear().range([0, 700]);
  var y = d3.scale.linear().range([0, 230]);

  x.domain(d3.extent(data,  function(d) { return d.year; }));
  y.domain([0, d3.max(data, function(d) { return d.kills; })]);

  

  svg.append("path")
      .attr("class", "area")
      .attr("d", total_area(data));

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);    

  var linegraph = svg.append("path")
          .attr("d", total_line(data))
          .attr("stroke", "#549fc2")
          .attr("stroke-width", 0)
          .attr("fill", "none");                  

  });
})(dimple);