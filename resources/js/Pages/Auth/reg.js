
$(document).ready(function () {
    setInterval(() => {
        $(".box").hover(function(){
            $(this).addClass("border border-info");
        },function(){
            $(this).removeClass("border border-info");        
        })
    
        $("#box1").click(function(){
            $(this).addClass("bg-info");
            $(this).addClass("text-light");
            $(".btn").removeAttr("disabled").text("Create Your Recruiter Account");
            $(".btn").addClass("btn-info");
            var i = $("#client").prop("checked");
           if (i == false) {
            $("#client").prop("checked",'checked');
           }
           var get = $("#box2").hasClass("bg-info");
           if (get == true) {
            $("#box2").removeClass("bg-info");
            
           }
           var x = $("#box2").hasClass("text-light");
           if (x == true) {
            $("#box2").removeClass("text-light");
           }
        })
    
        $("#box2").click(function(){
            $(this).addClass("bg-info");
            $(this).addClass("text-light");
            $(".btn").removeAttr("disabled").text("Create Your Applicant Account");
            $(".btn").addClass("btn-info");
            var i = $("#free").prop("checked");
           if (i == false) {
            $("#free").prop("checked",'checked');
           }
           var see = $("#box1").hasClass("bg-info");
           if (see == true) {
            $("#box1").removeClass("bg-info");
           
           }
           var y = $("#box1").hasClass("text-light");
           if (y == true) {
            $("#box1").removeClass("text-light");
           }
        })

        $("#change-button").click(function(){
            alert("hello dev")
        })
    }, 1000);
});
