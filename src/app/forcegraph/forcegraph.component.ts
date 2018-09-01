import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Component, OnInit, ElementRef, ViewEncapsulation, Input, OnChanges } from '@angular/core';
declare var d3

@Component({
  selector: 'app-forcegraph',
  templateUrl: './forcegraph.component.html',
  styleUrls: ['./forcegraph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ForcegraphComponent implements OnInit, OnChanges {
  constructor(private el:ElementRef, private http: Http) {
    this.query = ""
    this.iterations = "0"
   }


   query:string
   iterations:string

  ngOnInit() {

  }

  ngOnChanges(){
    if(this.query != "" && parseInt(this.iterations) > 0) {
      this.drawGraph()
    }
  }

  drawGraph() {

    let svg = d3.select(this.el.nativeElement).select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");

    let color = d3.scaleOrdinal(d3.schemeCategory10);

    var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function (d) { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));


    let myParams = new URLSearchParams();
    myParams.append('query', this.query);
    myParams.append('iterations', this.iterations);
    let options = new RequestOptions({ search: myParams });
    return this.http.get("http://localhost:5000/", options).toPromise()
    .then((response)=>{
      let graph = response.json()
      var link = svg.select("g.links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", function (d) { return Math.sqrt(d.value); });

      var node = svg.select("g.nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("fill", function (d) {
          return color(d.group);
        }).attr("r", 5)
        .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
      node.exit().remove()

      node.append("title")
        .text(function (d) { return d.id; });

      simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

      simulation.force("link")
        .links(graph.links);

      simulation.alphaTarget(0.3).restart()
      function ticked() {
        link
          .attr("x1", function (d) {
            return d.source.x;
          })
          .attr("y1", function (d) { return d.source.y; })
          .attr("x2", function (d) { return d.target.x; })
          .attr("y2", function (d) { return d.target.y; });

        node
          .attr("cx", function (d) { return d.x; })
          .attr("cy", function (d) { return d.y; });
      }
    });

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }

}
