function multiply(a, b) {
  "use strict";
  let alist = parse_param(a);
  let blist = parse_param(b);

  let sum_dict = {};
  alist.forEach(function(a_elem) {
    blist.forEach(function(b_elem){
      let z = a_elem.z + b_elem.z;
      if(z in sum_dict) {
        sum_dict[a_elem.z + b_elem.z] += a_elem.v * b_elem.v;
      }
      else {
        sum_dict[a_elem.z + b_elem.z] = a_elem.v * b_elem.v;
      }
    })
  });

  console.log(sum_dict);

  for(var k in sum_dict) {
    if(sum_dict.hasOwnProperty(k)) {
      console.log(k);
    }
  }


  function parse_param(st) {
    let _list = [];
    while (st) {
      let x = st.substring(0,4);
      st = st.replace(x, '');
      _list.push({
        'v': parseInt(x, 10),
        'z': st.length
      });
    }

    return _list;
  }

}

//console.log( '58608473622772837728372827'.split('') );
multiply("58608473622728371728372827", "7586374672263726736374");
