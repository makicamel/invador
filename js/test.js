var test = {
    left: 10,
    right: 20,
    put: function(){
        this.left += 10;
        console.log(this.left);
        // test.put();
        // setTimeout(test.put, 1000);
    },
    recrusion: function(){
        setTimeout(this.put, 1000);
    }
}
goTest();

function goTest(){
    test.put();
    setTimeout(goTest, 1000);
}

$('#stock').on('click',function(){
   // test.left += 10;
    test.recrusion();
})
