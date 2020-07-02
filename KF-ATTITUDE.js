<script type="text/javascript">

//
// Code extracted and adapted from:
// https://simondlevy.academic.wlu.edu/kalman-tutorial/the-extended-kalman-filter-an-interactive-tutorial-for-non-experts-part-7/
// Written by Simon D. Levy, Computer Science Department, Washington and Lee University
//

// Globals
var x_array = [];
var z_array = [];


function init() {

    // Clear canvas
    ctx = getCanvasContext();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    x = getFloatValue("xinit");

    a = getFloatValue("a");
    r = getFloatValue("r");

    // Initialize arrays for plot
    x_array = [];
    z_array = [];

    for (k = 0; k < 10; k++) { 

        setIndexedValue("x", k, x, 0);
        z = x + 2 * r * Math.random() - r;
        setIndexedValue("z", k, z, 0);

        // Append values to arrays for plotting
        x_array.push(x);
        z_array.push(z);

        if (k == 0) {

            setIndexedValue("xhat", k, z, 0);
        }
        else {

            clearValue("xhat", k);
        }

        clearValue("p", k);
        clearValue("g", k);

        // Update X
        x *= a;
    }

    // Plot arrays
    plotMyArray(x_array, "blue"); 
    plotMyArray(z_array, "red"); 

    setIndexedValue("p", 0, 1, 0)

} // init

function plotMyArray(array, color) {

    plotArray(getCanvasContext(), array, color, 0, 1200);
}

function run() {

    // Initialize parameters from values in textboxes
    a = getFloatValue("a");
    r = getFloatValue("r");

   // Initialize state estimate and error covariance
    xhat = z_array[0];
    p = 1;

    // Initialize array of state estimates
    xhat_array = [xhat];

     // Compute values from Kalman filter and add them to the table
    for (k = 1; k < 10; k++) { 

        // Get values from array
        z    = z_array[k];

        // Compute new values using Kalman filter formulas: based on 
        // http://en.wikipedia.org/wiki/Kalman_filter#Update

        // Predict
        xhat = a * xhat;
        p    = a * p * a;

        // Update
        g    = p  / (p  + r);
        xhat = xhat + g * (z - xhat);
        p    = (1 - g) * p;

        // Set new values in table
        setIndexedValue("g",    k, g,    3); 
        setIndexedValue("xhat", k, xhat, 0);
        setIndexedValue("p",    k, p,    3);


        // Append values to arrays for plotting
        z_array.push(z);
        xhat_array.push(xhat);
    }

    // Plot arrays
    plotMyArray(xhat_array, "green");

}

function setIndexedValue(tagbase, index, value, prec) {

    document.querySelector(indexToTag(tagbase, index)).value = roundToPrecision(value, prec);
}
</script>
