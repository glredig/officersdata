(function() {
  var data = d3.csv("./leoka-summary-kills.csv", function (data) {
    data.forEach(function(d) {
      d['year'] = +d['year'];
      d['kills'] = +d['kills'];
      d['killsfel'] = +d['killsfel'];
    });
    var margins = {
      top: 30,
      right: 30,
      bottom: 50,
      left: 50
    };

    var total_height = 400;
    var total_width = 900;

    var height = total_height - margins.top - margins.bottom;
    var width = total_width - margins.left - margins.right;
    
    var svg = d3.select('#area_chart').append('svg')
      .attr('width', total_width)
      .attr('height', total_height);

    var x = d3.scale.linear()
      .domain([d3.min(data, function(d) {return d.year }), d3.max(data, function(d) { return d.year })])
      .range([0, width]);

    var y = d3.scale.linear()
      .domain([0, d3.max(data, function(d) {return d.kills}) + 2])
      .range([height, 0]);

    var total_line = d3.svg.line()
      .x(function(d) { return x(d.year) })
      .y(function(d) { return y(d.kills) })

    var felony_line = d3.svg.line()
      .x(function(d) { return x(d.year) })
      .y(function(d) { return y(d.killsfel) })  

    var accidental_line = d3.svg.line()
      .x(function(d) { return x(d.year) })
      .y(function(d) { return y(d.killsacc)})                                          

    

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

    var div = d3.select("body").append("div")   
      .attr("class", "tooltip")               
      .style("opacity", 0);      

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + margins.left + "," + (height + margins.top) + ")")
      .call(xAxis)
      .selectAll('text')
      .style("text-anchor", "end")
      .attr('transform', 'translate(12,' + 10 + ')');

    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
      .call(yAxis);  

    svg.append("text")
      .attr("class", "x_label")
      .attr("text-anchor", "end")
      .attr("x", (width + margins.left) / 2)
      .attr("y", height + margins.top + margins.bottom - 6)
      .text("year");

    svg.append("text")
      .attr("class", "y_label")
      .attr("text-anchor", "end")
      .attr("x", -(height + margins.top) / 2 + 50 )
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("law enforcement deaths");

    // Total graph
    svg.append("svg:path")
      .attr("d", total_line(data))
      .attr('class', 'total_line')
      .attr("stroke", "#000")
      .attr("stroke-width", 2)
      .attr('transform', 'translate(' + margins.left + ', ' + margins.top + ')')
      .attr("fill", "none"); 

    var total_points = svg.selectAll(".point")
      .data(data)
      .enter()
      .append("svg:circle")
      .attr("stroke", "#000")
      .attr("fill", function(d, i) { return "#000" })
      .attr("cx", function(d, i) { return x(d.year) })
      .attr("cy", function(d, i) { return y(d.kills) })
      .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
      .attr("r", function(d, i) { return 2 })
      .on("mouseover", function(d) {      
        var str = '<span class="label">Population:</span>';
        str += '<div class="value">' + d.pop + '</div>'
        str += '<span class="label">Sworn:</span>';
        str += '<div class="value">' + d.sworn + '</div>';
        str += '<span class="label"># of arrests:</span>';
        str += '<div class="value">' + d.narrests + '</div>';        
        div.transition()        
          .duration(50)      
          .style("opacity", .9);      
        div .html(str)  
          .style("left", (d3.event.pageX + 20) + "px")     
          .style("top", (d3.event.pageY - 28) + "px");    
        })                  
      .on("mouseout", function(d) {       
        div.transition()        
          .duration(200)      
          .style("opacity", 0); 
      });  

    // Felony graph
    svg.append("svg:path")
      .attr("d", felony_line(data))
      .attr("stroke", "#ff5555")
      .attr("stroke-width", 2)
      .attr('transform', 'translate(' + margins.left + ', ' + margins.top + ')')
      .attr("fill", "none");  

    var felony_points = svg.selectAll(".point")
      .data(data)
      .enter()
      .append("svg:circle")
      .attr("stroke", "#ff5555")
      .attr("fill", function(d, i) { return "#ff5555" })
      .attr("cx", function(d, i) { return x(d.year) })
      .attr("cy", function(d, i) { return y(d.killsfel) })
      .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
      .attr("r", function(d, i) { return 2 })
      .on("mouseover", function(d) {  
        var str = '<span class="label">Population:</span>';
        str += '<div class="value">' + d.pop + '</div>'
        str += '<span class="label">Sworn:</span>';
        str += '<div class="value">' + d.sworn + '</div>';
        str += '<span class="label"># of arrests:</span>';
        str += '<div class="value">' + d.narrests + '</div>';          
        div.transition()        
          .duration(50)      
          .style("opacity", .9);      
        div .html(str)  
          .style("left", (d3.event.pageX + 20) + "px")     
          .style("top", (d3.event.pageY - 28) + "px");    
        })             
      .on("mouseout", function(d) {       
        div.transition()        
          .duration(200)      
          .style("opacity", 0); 
      });

    // Accidental graph
    svg.append("svg:path")
      .attr("d", accidental_line(data))
      .attr('class', 'accidental_line')
      .attr("stroke", "#5555ff")
      .attr("stroke-width", 2)
      .attr('transform', 'translate(' + margins.left + ', ' + margins.top + ')')
      .attr("fill", "none");     

    var accidental_points = svg.selectAll(".point")
      .data(data)
      .enter()
      .append("svg:circle")
      .attr("stroke", "#5555ff")
      .attr("fill", function(d, i) { return "#5555ff" })
      .attr("cx", function(d, i) { return x(d.year) })
      .attr("cy", function(d, i) { return y(d.killsacc) })
      .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')')
      .attr("r", function(d, i) { return 2 })
      .on("mouseover", function(d) {  
        var str = '<span class="label">Population:</span>';
        str += '<div class="value">' + d.pop + '</div>'
        str += '<span class="label">Sworn:</span>';
        str += '<div class="value">' + d.sworn + '</div>';
        str += '<span class="label"># of arrests:</span>';
        str += '<div class="value">' + d.narrests + '</div>';     
        div.transition()        
            .duration(50)      
            .style("opacity", .9);      
        div .html(str)  
            .style("left", (d3.event.pageX + 20) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");    
        })             
      .on("mouseout", function(d) {       
        div.transition()        
            .duration(200)      
            .style("opacity", 0); 
      });            

    svg.append('text')
      .attr('class', 'legend_total')
      .attr('x', (width * .9))
      .attr('y', (height * .05))
      .style('fill', '#5555ff')
      .text('accidental')

    svg.append('text')
      .attr('class', 'legend_felony')
      .attr('x', (width * .9))
      .attr('y', (height * .1))
      .style('fill', '#ff5555')
      .text('felony')  

    svg.append('text')
      .attr('class', 'legend_total')
      .attr('x', (width * .9))
      .attr('y', (height * .15))
      .style('fill', '#000000')
      .text('total')  
    });
})();