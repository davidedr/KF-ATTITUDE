<script type="text/javascript">

//
// Code extracted and adapted from
// https://simondlevy.academic.wlu.edu/kalman-tutorial/the-extended-kalman-filter-an-interactive-tutorial-for-non-experts-part-9/
// Written by Simon D. Levy, Computer Science Department, Washington and Lee University
//

function initValue(tag, value) {

    slider = document.getElementById(tag.concat('slider')); 
    slider.value = value;
    document.querySelector('#'.concat(tag)).value = value;

}

function random(variance) {

    return 2 * variance * Math.random() - variance;
}

function init() {

    initValue('a', 0.95); 
    initValue('b', 0.5); 
    initValue('c', 1.0); 
    initValue('r', 100); 
    run();
}

function plotMyArray(array, color) {

    plotArray(getCanvasContext(), array, color, 0, 1200);
}


function run() {

    // Arbitrary constants
    x = 1000;
    n = 100;

    // Constants from slider values
    a = getFloatValue("a");
    b = getFloatValue("b");
    c = getFloatValue("c");
    r = getFloatValue("r");
 
    // Initialize arrays for plot
    x_array = [];
    z_array = [];

    // Clear previous plot
    ctx = getCanvasContext();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Draw axes
    var w = ctx.canvas.width;
    var h = ctx.canvas.height;
    ctx.beginPath();
    ctx.strokeStyle = "gray";
    ctx.moveTo(0,h); ctx.lineTo(w,h);   // X axis
    ctx.moveTo(0,0); ctx.lineTo(0,h);   // Y axis
    ctx.stroke();

    // Compute state, observation signals
    for (k = 0; k < n; k++) { 

        // Arbitrary upward control signal
        u = k;

        // Noise
        v = random(r);

        // Update state
        x = a*x + b*u;

        // Update observation
        z = c*x + v;

        // Append values to arrays for plotting
        x_array.push(x);
        z_array.push(z);
    }

    // Plot state, observation
    plotMyArray(x_array, "blue");
    plotMyArray(z_array, "red");

   // Initialize state estimate and error covariance
    xhat = z_array[0];
    p = 1;

    // Initialize array of state estimates
    xhat_array = [xhat];

    // Compute estimated state signal
    for (k = 1; k < n; k++) {

        // Arbitrary upward control signal
        u = k;

        // Get values from array
        z    = z_array[k];

        // Compute new values using Kalman filter formulas: based on 
        // http://en.wikipedia.org/wiki/Kalman_filter#Update

        // Predict
        xhat = a*xhat + b*u;
        p    = a*p*a;

        // Update
        g    = p == 0 ? 1 : p*c  / (c*p*c  + r);
        xhat = xhat + g * (z - c*xhat);
        p    = (1 - g*c) * p;

        // Append value to array for plotting
        xhat_array.push(xhat);
    }

    // Plot estimated state signal
    plotMyArray(xhat_array, "green");
 }

function update(tag, value) {

  document.querySelector('#'.concat(tag)).value = value;

  run();
}


</script>
