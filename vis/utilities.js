/**
 * utilities.js
 * Author: Sam Xifaras
 *
 */

/**
 * Preset margins for all of the visualizations
 * @type {{top: number, left: number, bottom: number, right: number}}
 */
let margin = {
    top: 40,
    left: 40,
    bottom: 40,
    right: 40
};

/**
 * Constructs a legend on a graph
 * @param parent The parent node to append the legend onto
 * @param width Width in which to render the legend
 * @param keys Array of keys
 * @param colors Array of colors
 * @param margin Margin object
 * @param offsetX The x of the top left corner of the legend box
 * @param offsetY The y of the top left corner of the legend box
 */
function constructLegend(parent, width, keys, colors, margin, offsetX, offsetY) {
    let rectWidth = 30;
    let padding = 10;

    parent.selectAll("g")
        .data(keys)
        .enter()
        .append("g")
        .each(function(d, i) {
            let elem = d3.select(this);
            elem.append("rect")
                .attr("fill", colors[i])
                .attr("width", 20)
                .attr("height", 20)
                .attr("x", offsetX + margin.left)
                .attr("y", offsetY + margin.top + i * rectWidth + i * padding - rectWidth / 2);

            elem.append("text")
                .attr("x", offsetX + width - margin.right)
                .attr("y", offsetY + margin.top + i * rectWidth + i * padding)
                .attr("text-anchor", "end")
                .text(d);
        });
}

// TODO: Try to implement this. Adds x and y axis labels and a header to a chart
function addLabels() {

}

/**
 * Wraps text based on the given width
 * @param text The text to wrap
 * @param width The width to constrain the text to
 *
 * Copied from https://bl.ocks.org/mbostock/7555321
 */
function wrap(text, width) {
    text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}


/**
 * Creates a range of natural numbers from 0 to n - 1
 * @param n The number of natural numbers in the range
 * @returns Array An array of natural numbers in ascending order from 0 to n - 1
 */
function natRange(n) {
    if (n == 0) return [];
    else return natRange(n - 1).concat([n - 1]);
}

/**
 * Creates a border around the graphic
 * @param svg A DOM svg element
 */
function addBorder(svg) {
    let borderedSvg = d3.select(svg);

    let width = borderedSvg.attr("_initWidth");
    let height = borderedSvg.attr("_initHeight");

    borderedSvg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("fill-opacity", 0.0)
        //.attr("fill", FAKEBOOKBLUE)
        .attr("stroke", "black");

    return borderedSvg.node();
}


/**
 * Gets a random subarray of the given array of the given size.
 * If size is greater than length then it returns a shuffled copy of the array
 * @param arr The array to sample
 * @param size The size of the sample
 * @returns {Array} The random sample
 *
 * Copied from https://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
 */
function getRandomSubarray(arr, size) {
    var n = Math.min(size, arr.length);

    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, n);
}

/**
 * Creates an object
 * @param friends
 */
function friendsSplitByYear(friends) {
    let intermed = {};
    let out = [];
    friends.forEach((item) => {
       let date = new Date(item["timestamp"] * 1000);
       if (intermed.hasOwnProperty(date.getFullYear().toString())) {
           intermed[date.getFullYear().toString()].push(item[name]);
       } else {
           intermed[date.getFullYear().toString()] = [item[name]];
       }
    });

    Object.keys(intermed).forEach((year) => {
        out.push({"year": +year, "count": intermed[year].length});
    });

    return out.sort((a, b) => {
        return a.year - b.year;
    });
}