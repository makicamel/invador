
document.onkeydown = keydown;
var stopFlg = false;
var timer;

var enemyMap = {
    map: [[3,1],[3,1],[3,1],
         [1,1],[1,1],[1,1]
        ],
    init: function(){
        // this.map = [[3,1],[3,1],[3,1],[2,1],[2,1],[2,1]];
        // {'x1': '1', 'x2': '1', 'x3': '1'};

        // alert(this.map.x1);
    },
    render: function(){
        var i = 0;
        var x = 0;
        var y = 1;
        switch (this.map[i][x]){
            case 1:
                console.log("yo");
                break;
            case 2:
                console.log("he");
                break;
            case 3:
                console.log('3つめのやつ');
                break;
        }

    },
    alerts: function(){
        alert(this.map[0][1]);
    }
}
//enemyMap.init();
//enemyMap.render();
// enemyMap.alerts();

var enemy = {
    fldWidth: $('#enemy_field').innerWidth(),
    fldPos: {
        'L': $('#enemy_field').offset().left,
        'R': $('#enemy_field').offset().left + $('#enemy_field').innerWidth()
    },
    enmSecWidth: $('#enemy_section').innerWidth(),
    enmSecPos: {
        'L': $('.leftest').offset().left,
        'R': $('.rightest').offset().left + $('.rightest').innerWidth()
    },
    enmEndPos: {
        'L': 0,
        'R': 0
    },
    directToR: true,
    init: function(){
        enemy.enmEndPos.L = $('.leftest').offset().left;
        enemy.enmEndPos.R = $('.rightest').offset().left + $('.rightest').innerWidth();
    },
    moveRender: function(){
        if (stopFlg) { return false;}
        enemy.movePos();
        $('.enm').toggleClass('active');
        timer = setTimeout(enemy.moveRender,700);
    },
    movePos: function(){
        var move_px = 8;
        if (enemy.directToR){ enemy.directToR = (enemy.enmEndPos.R + move_px) <= enemy.fldPos.R ? true : false; }
        else                { enemy.directToR = (enemy.enmEndPos.L - move_px) <= enemy.fldPos.L ? true : false; }
        if (enemy.directToR){ enemy.enmSecPos.L += move_px; enemy.enmSecPos.R += move_px; enemy.enmEndPos.L += move_px; enemy.enmEndPos.R += move_px; }
        else               { enemy.enmSecPos.L -= move_px; enemy.enmSecPos.R -= move_px; enemy.enmEndPos.L -= move_px; enemy.enmEndPos.R -= move_px; }
        $('#enemy_section').css('left', enemy.enmSecPos.L + 'px');
    }
}
enemy.init();
enemy.moveRender();

// ** todo コード整理 **
function keydown(){
    const RIGHT_KEY = 39;
    const LEFT_KEY = 37;
    const UP_KEY = 38;
    const MOVE_PX = 8;
    if (event.keyCode == RIGHT_KEY){
        var l = $('.member').offset().left + MOVE_PX;
        $('.member').css('left', l + 'px');        
    } else if (event.keyCode == LEFT_KEY){
        var l = $('.member').offset().left - MOVE_PX;
        $('.member').css('left', l + 'px');
    } else if (event.keyCode == UP_KEY){
        bangBullet();
    }
}

function bangBullet(){
    var mybullet = $('.mybullet');
    var myplane = $('.member');
    var top = myplane.offset().top - 4;
    var left = myplane.offset().left + myplane.innerWidth()/2;
    var hit;
    if (mybullet.is(':visible')){ return false; }
    mybullet.css('left', left + 'px');
    mybullet.show();

    var callback = function(){
        top -= 20;
        mybullet.css("top", top + 'px');
        if(checkHit() || top < 0) { initBullet(); }
        else { hit = setTimeout(callback, 50); }
    }
    hit = setTimeout(callback,0);

    function initBullet(){
        clearTimeout(hit);
        top = myplane.offset().top - 4;
        mybullet.css('top', top + 'px');
        mybullet.hide();
    }
    function checkHit(){
        var result = false;
        $('.enm').each(function(index,element){
            var hitObj = $(element);
            var hitObjY = hitObj.offset().top + hitObj.outerHeight();
            var hitObjL = hitObj.offset().left;
            var hitObjR = hitObjL + hitObj.innerWidth();
            if (hitObjY >= top && (hitObjL <= left && hitObjR >= left)){
                hitObj.removeClass('enm').removeClass('active').addClass('hit');
                setTimeout(function(){ hitObj.removeClass('hit').addClass('blank'); },250);
                result = true;
                if (hitObj.hasClass('leftest')) {
                    hitObj.removeClass('leftest');
                    hitObj.next().addClass('leftest');
                    enemy.init();
                }
                else if (hitObj.hasClass('rightest')){
                    hitObj.removeClass('rightest');
                    hitObj.prev().addClass('rightest');
                    enemy.init();
                }
            }
        })
        return result;
    }
}

function kirikae(){
    if (stopFlg) { stopFlg = false; enemy.moveRender(); }
    else { stopFlg = true; }
}