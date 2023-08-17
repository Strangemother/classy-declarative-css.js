

v = addStylesheetRules([
    ['body',
        ['background', '#333']
        , ['color', '#991111']
    ]
]);


v = addStylesheetRules([
    ['body',
        [
            ['background', '#333']
            , ['color', '#991111']
        ]
    ]
]);

v = addStylesheetRules([
    ['body',
        [
            ['background', '#333']
            , ['color', '#991111']
        ]
        , [
            ['background', '#555']
            , ['color', '#991221']
        ]
    ]
]);


v = addStylesheetRules({
    body: {
        background: '#111'
        , color: '#11AA11'
    }
});


v = addStylesheetRules({
    body: [
        {background: '#111'}
        , {color: '#11AA11'}
    ]
});


let propInfo = { background: '#111' }


b = addStylesheetRules({
    body: [
        {color: '#11AA11'}
        , propInfo
    ]
});


propInfo.background = '#000'
propInfo.color = 'red'
b[0].replace()
z=b[0]
monitorClasses(document.body)

const assert = function(a, b) {
    console.assert(a, b)
    return Boolean(a) == true
}


function setDifference(a, b) {
  return new Set(Array.from(a).filter(item => !b.has(item)));
}


const assertLists = function(a, b) {
    let sa = new Set(a)
    let sb = new Set(b)
    let a_intersect_b = setDifference(sa,sb)
    let b_intersect_a = setDifference(sb, sa)
    let u = new Set([...a_intersect_b, ...b_intersect_a])
    let isSame = u.size == 0
    console.assert(isSame, `${a} does not match ${b}`)
    if(!isSame) {
        console.info('difference', u)
    }
}

cg = generateClassGraph()


const testExample = function(str, props, values) {
    let b = cg.objectSplit(str)
    assertLists(b.props,  props)
    assertLists(b.values, values)


    return b
}

a = testExample('margin-auto-1em'
                , ['margin']
                , ['auto', '1em']
                )

b = testExample('margin-block-end-5%'
                , ['margin', 'block', 'end']
                , ['5%']
            )

c = testExample('border-bottom-dotted-1px'
                    , ['border', 'bottom']
                    , ['dotted', '1px']
                )

d = testExample('gap-1em'
                    , ['gap']
                    , ['1em']
                )

e = testExample('color-green'
                    , ['color']
                    , ['green']
                )

cg.insertRule(b)
cg.insertRule(c)

ss = '.gap-1em'
ok = assert(!selectorExists(ss), `selector (incorrectly) exists '${ss}'`)
cg.insertRule(d)
ok = assert(selectorExists(ss), `selector does not exist '${ss}'`)
cg.insertRule(d)

let ir = cg.insertRule(e)
// cg.insertRule(a)
// cg.insertRule(b)
console.log(a, b,c )
console.log(ir)

ss = cg.asSelectorString(b)
assert(selectorExists(ss), `Selector does not exist: "${ss}"`)