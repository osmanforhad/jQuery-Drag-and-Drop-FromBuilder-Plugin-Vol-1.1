/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * Main Script for Drag & Drop Jquery
 */
$(init);
function init() {
    var diagram = [];
    var canvas = $(".canvas");
    var tools = $(".tools");
    $(".tool").draggable({
        helper: "clone"
    });
    canvas.droppable({
        drop: function (event, ui) {
            var node = {
                _id: (new Date).getTime(),
                position: ui.helper.position()
            };
            node.position.left -= canvas.position().left;
            if (ui.helper.hasClass("tool-1")) {
                node.type = "TOOL-1";
            } else if (ui.helper.hasClass("tool-2")) {
                node.type = "TOOL-2";
            } else if (ui.helper.hasClass("tool-3")) {
                node.type = "TOOL-3";
            } else if (ui.helper.hasClass("tool-4")) {
                node.type = "TOOL-4";
            } else if (ui.helper.hasClass("tool-5")) {
                node.type = "TOOL-5";
            } else if (ui.helper.hasClass("tool-6")) {
                node.type = "TOOL-6";
            } else {
                return;
            }
            diagram.push(node);
            renderDiagram(diagram);
        }
    });
    function renderDiagram(diagram) {
        canvas.empty();
        for (var d in diagram) {
            var node = diagram[d];
            var html = "";
            if (node.type === "TOOL-1") {
                html = "<input type='text' name='' value='' placeholder='input field'>";
            } else if (node.type === "TOOL-2") {
                html = "<input type='password' name='' value='' placeholder='Password field'>";
            } else if (node.type === "TOOL-3") {
                html = "<textarea rows='4' cols='50'></textarea>";
            } else if (node.type === "TOOL-4") {
                html = "<input type='checkbox' name='checked' value='checked'>";
            } else if (node.type === "TOOL-5") {
                html = "<input type='radio' name='checked' value='checked'>";
            } else if (node.type === "TOOL-6") {
                html = "<button type='submit' value='Submit'>Submit</button>";
            }
            var dom = $(html).css({
                "position": "absolute",
                "top": node.position.top,
                "left": node.position.left
            }).draggable({
                stop: function (event, ui) {
                    console.log(ui);
                    var id = ui.helper.attr("id");
                    for (var i in diagram) {
                        if (diagram[i]._id == id) {
                            diagram[i].position.top = ui.position.top;
                            diagram[i].position.left = ui.position.left;
                        }
                    }
                }
            }).attr("id", node._id);
            canvas.append(dom);
        }
    }
}


