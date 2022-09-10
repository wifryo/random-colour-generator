# random-colour-generator

Generate a box of randomised colouration in the IDE.

If no additional arguments are passed, a box of predefined size is generated with a random colour:

![Random colour box](/images/01.png)

A colour and luminosity can be specified, using the syntax `node index.js <colour> <luminosity>`. This will generate a box of predefined size with randomised colouration per the parameters passed:

![Randomised colour box](/images/02.png)

If the keyword "ask" is passed as the only argument, the user is prompted to provide the colour and luminosity:

![Prompted randomised colour box](/images/03.png)

If the colour and luminosity are preceded by dimensions, using the syntax `node index.js <width>X<height> <colour> <luminosity>`, the box will be generated with dimensions that match those passed in:

![Defined dimensions randomised colour box](/images/04.png)

The dimension definition will work with any non-negative integers.
