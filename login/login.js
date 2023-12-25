//==================================Sing Up stard==================================
jQuery(document).ready(function ($) {
    $("#Sing-up-button").on("click", function () {
        var formData = {
            username: $("#Sing-up-username").val(),
            email: $("#Sing-up-email").val(),
            password: $("#Sing-up-password").val(),
            agree: $("#Sing-up-check").is(":checked")
        };
        $.ajax({
            url: "https://cbsiot.live/sanjeevani/api.php",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                // Handle the API response here
                console.log(response);
            },
            error: function (error) {
                console.error("Error:", error);
            }
        });
    });
});
//==================================Sing Up end==================================
//==================================Login start==================================
$(document).ready(function () {
    $("#loginButton").on("click", function () {
      var formData = {
        email: $("#login-email").val(),
        password: $("#login-password").val()
      };
  
      $.ajax({
        url: "https://cbsiot.live/sanjeevani/login/api.php",
        type: "POST",
        dataType: "json",
        data: formData,
        success: function (response) {
          // Handle the API response here
          if (response.success) {
            // Redirect to the success URL (adjust the URL as needed)
            window.location.href = "https://getbootstrap.com/docs/4.0/components/forms/";
          } else {
            // Handle login failure
            alert("Login failed. Please check your credentials.");
          }
        },
        error: function (error) {
          console.error("Error:", error);
        }
      });
    });
  });
//==================================Login end==================================
//==================================Forgate password start==================================
//----------------------------------client side OTP start--------------------------------------
$(document).ready(function () {
    const inputs = $(".otp-field > input");
    const button = $(".otpbtn");
  
    inputs.eq(0).focus();
    button.attr("disabled", "disabled");
  
    inputs.eq(0).on("paste", function (event) {
      event.preventDefault();
  
      const pastedValue = event.originalEvent.clipboardData.getData("text");
      const otpLength = inputs.length;
  
      for (let i = 0; i < otpLength; i++) {
        if (i < pastedValue.length) {
          inputs.eq(i).val(pastedValue[i]);
          inputs.eq(i).removeAttr("disabled");
          inputs.eq(i).focus();
        } else {
          inputs.eq(i).val(""); // Clear any remaining inputs
          inputs.eq(i).focus();
        }
      }
    });
  
    inputs.each(function (index1) {
      $(this).on("keyup", function (e) {
        const currentInput = $(this);
        const nextInput = currentInput.next();
        const prevInput = currentInput.prev();
  
        if (currentInput.val().length > 1) {
          currentInput.val("");
          return;
        }
  
        if (nextInput && nextInput.attr("disabled") && currentInput.val() !== "") {
          nextInput.removeAttr("disabled");
          nextInput.focus();
        }
  
        if (e.key === "Backspace") {
          inputs.each(function (index2) {
            if (index1 <= index2 && prevInput.length) {
              $(this).attr("disabled", true);
              $(this).val("");
              prevInput.focus();
            }
          });
        }
  
        button.removeClass("active");
        button.attr("disabled", "disabled");
  
        const inputsNo = inputs.length;
        if (!inputs.eq(inputsNo - 1).prop("disabled") && inputs.eq(inputsNo - 1).val() !== "") {
          button.addClass("active");
          button.removeAttr("disabled");
  
          return;
        }
      });
    });
  });
//--------------------------------------clind side OTP end--------------------------------------  
//--------------------------------------server side OTP--------------------------------------
$(document).ready(function () {
    $("#submitBtn").on("click", function () {
      var enteredOTP = getEnteredOTP();
      var formData = {
        email: $("#otp-email").val(),
        password: $("#otp-new-password").val(),
        enteredOTP: enteredOTP
      };
  
      $.ajax({
        url: "https://cbsiot.live/sanjeevani/login/api.php",
        type: "POST",
        dataType: "json",
        data: formData,
        success: function (response) {
          if (response && response.otp === enteredOTP) {
            alert("OTP verification successful!");
            window.location.href = "https://sonjoveeny.com/HospitalMS/login/login.html";
          } else {
            alert("Invalid OTP. Please try again.");
          }
        },
        error: function (error) {
          console.error("Error:", error);
        }
      });
    });
  
    $("#resendLink").on("click", function (event) {
      event.preventDefault();
      alert("Resend link clicked. Implement resend logic here.");
    });
  
    function getEnteredOTP() {
      var enteredOTP = "";
      $(".otp-field input[type='number']").each(function () {
        enteredOTP += $(this).val();
      });
      return enteredOTP;
    }
  });
  //--------------------------------------server side OTP end--------------------------------------
//==================================Forgate password end==================================