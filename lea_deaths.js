(function() {
  var data = d3.csv("./leoka-summary-kills.csv", function (data) {
    data.forEach(function(d) {
      d['kills'] = +d['kills'];
      d['killsfel'] = +d['killsfel'];
    });
    var margins = {
      top: 30,
      right: 30,
      bottom: 30,
      left: 40
    };

    var total_height = 500;
    var total_width = 900;

    var height = total_height - margins.top - margins.bottom;
    var width = total_width - margins.left - margins.right;
    
    var svg = d3.select('#area_chart').append('svg')
                .attr('width', total_width)
                .attr('height', total_height);

    var total_area = d3.svg.area()
                      .x(function(d) { return x(d.year); })
                      .y0(height)
                      .y1(function(d) { return y(d.kills); });

    var total_line = d3.svg.line()
                      .x(function(d) { return d.year })
                      .y(function(d) { return d.kills })

    var felony_area = d3.svg.area()
                      .x(function(d) { return x(d.year); })
                      .y0(height)
                      .y1(function(d) { return y(d.killsfel); });

    var felony_line = d3.svg.line()
                      .x(function(d) { return d.year })
                      .y(function(d) { return d.killsfel })                      

    var x = d3.scale.linear()
            .domain([d3.min(data, function(d) {return d.year }), d3.max(data, function(d) { return d.year })])
            .range([0, width]);
    var y = d3.scale.linear()
            .domain([0, d3.max(data, function(d) {return d.kills}) + 2])
            .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .tickFormat(d3.format("d"))
      .innerTickSize(-height)
      .outerTickSize(0)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .innerTickSize(-width)
      .outerTickSize(0)
      .orient("left");        

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + margins.left + "," + (height + margins.top) + ")")
      .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
        .call(yAxis);  

    var line = d3.svg.line()
      .x(function(d) { return x(d.x); })
      .y(function(d) { return y(d.y); }); 

    // Total graph

    svg.append("path")
        .attr("class", "area")
        .attr("d", total_area(data))
        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

    var linegraph = svg.append("path")
            .attr("d", total_line(data))
            .attr("stroke", "#326D80")
            .attr("stroke-width", 10)
            .attr("fill", "none"); 

    var points = svg.selectAll(".point")
            .data(data)
            .enter()
            .append("svg:circle")
            .attr("stroke", "#326D80")
            .attr("fill", function(d, i) { return "#326D80" })
            .attr("cx", function(d, i) { return x(d.year) })
            .attr("cy", function(d, i) { return y(d.kills) })
            .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
            .attr("r", function(d, i) { return 2 });       

    // Felony graph

    svg.append("path")
        .attr("class", "felony_area")
        .attr("d", felony_area(data))
        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

    var felony_linegraph = svg.append("path")
            .attr("d", felony_line(data))
            .attr("stroke", "#80326D")
            .attr("stroke-width", 10)
            .attr("fill", "none");  

    var points = svg.selectAll(".point")
            .data(data)
            .enter()
            .append("svg:circle")
            .attr("stroke", "#80326D")
            .attr("fill", function(d, i) { return "#80326D" })
            .attr("cx", function(d, i) { return x(d.year) })
            .attr("cy", function(d, i) { return y(d.killsfel) })
            .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
            .attr("r", function(d, i) { return 2 });

    });
})();