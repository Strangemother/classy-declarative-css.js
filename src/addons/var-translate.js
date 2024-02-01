/**
 * # var-* Translate
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/var
 *
 * Discover and rewrite class names values with `var-*` to the CSS function
 * `var(*)`. e.g.
 *
 *     "border-top-var-primary-edges"
 *
 *      {
 *          "border-top": var(--primary-edges)
 *      }
 */
const varTranslateReceiver = (function(){

    let cg;

    /**
     * The _automatic_ function called at the base of this iffe to
     * install the `font-pack-*` tokens into the class graph.
     *
     * @return {undefined}
     */
    const insertReceiver = function(){
        console.log('var-translate insertReceiver')
        // DynamicCSSStyleSheet.addons.varTranslateReceiver = function(_cg){
            // cg = _cg;
            // cg.insertReceiver(['var'], varReceiver)
        // }

        ClassGraph.addons.varTranslateReceiver = function(_cg){
            cg = _cg;
            cg.insertTranslator('var', variableDigest)
        }
    }

    /**
     * The handler function given to the dynamic css stylesheet, called
     * when the dcss is prepared.
     *
     * @param  {object} obj  A definition generated by the class graph discovery
     * @return {undefined}
     */
    const variableDigest =  function(splitObj, index) {
        /*
            Convert the value keys to a var representation.
                `var-name-switch` -> [var, name, switch]
            to
                `var(--name-switch)`
         */

        /*
            This is pretty dumb, and should improve to a forward stepping
            solution, detecting possible names

            Issue is a var can be anything `var(--1em)`.
            Therefore forward feed on _possibles_ is sticky. This is valid:

                {
                    margin: var(--1em) var(--orange)
                }

            Therefore break on `var`

                "margin-var-1em-var-orange"

            However `var(--var)` is valid:
                {
                    --var: 1em
                    --var-orange: orange;
                }


            Meaning:
                "margin-var-1em-var-var-orange"

            Therefore break on var, unless [var]+1 == var,
                as then its break on var, dont break on next var,
                yielding `var-orange`.`

            However also allowed: "margin-var-1em-var-var-var"

                {
                    --var-var:
                }

            So then possibly, two dashes between `var var``

                margin-var-key--var-var-var-var--var-var-key

                {
                    margin: var(key) var(var-var-var) var(var-key)
                }

            Allowing the strange but valid:
                {
                    --var-key: 1em;
                    --var-var-var-var: 2em;
                    --var-var-key: 1em solid;
                }

         */
        // console.log('running on', splitObj)
        // Tokenize as a family string.
        values = splitObj.values
        let keys = splitObj.values.slice(index)
        let k1 = keys.slice(1)
        let word = `var(--${k1.join("-")})`
        // console.log(keys, word)

        return word
    }



    ;insertReceiver();
})()
