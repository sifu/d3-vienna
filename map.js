(function(){

  var svg = d3.select( 'svg' );

  var projection = d3.geo.albers( )
  .rotate( [ 0, 0 ] )
  .center( [ 16.474247514683018, 48.27530439838101 ] )
  .translate( [ 400, 100 ] )
  .scale( 120000 );

  var path = d3.geo.path( )
  .projection( projection );

  d3.json( 'vienna-topojson.json', function( err, vienna ) {
    var cantons = topojson.object( vienna, vienna.objects.wien );

    svg.selectAll( 'path.canton' )
    .data( cantons.geometries )
    .enter( ).append( 'path' )
    .attr( 'class', 'canton' )
    .attr( 'd', path );

    svg.selectAll( 'text' )
    .data( cantons.geometries )
    .enter( ).append( 'text' )
    .attr( 'transform', function( d ) { return 'translate(' + path.centroid( d ) + ')'; } )
    .attr( 'dy', '.35em' )
    .text( function( d ) { return d.properties.BEZNR } );

  } );

})();
