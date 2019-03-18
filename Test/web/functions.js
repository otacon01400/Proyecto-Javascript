    var members = data.results[0].members[1].first_name;
    var names = [];
    var tempFirts = "";
    var tempMiddle = "";
    var tempLast = "";

//--------------------------------
//--------------------------------

    for (var i = 0; i < data.results[0].members.length; i++) //Runs the array and gets first, middle, and last of each index.
    //Writes them with key in another array
    // poner espacios en blanco!!!!!!
    {
      if(data.results[0].members[i].first_name != null) tempFirts = data.results[0].members[i].first_name;
      else tempFirts = " ";
      if(data.results[0].members[i].middle_name != null) tempMiddle = data.results[0].members[i].middle_name;
      else tempMiddle = " ";
      if(data.results[0].members[i].last_name != null) tempLast = data.results[0].members[i].last_name;
      else tempLast = " ";

      names[i] = tempFirts + " " + tempMiddle + " " + tempLast;
    }

//--------------------------------
//--------------------------------



  //Include para evitar for's cortos
  function tableMaker(array,checked,selected){ //Values of Checkboxes and Select Input are passed
    var tableRow = ["<tr><th> Senator </th><th> Party Affiliation </th><th> State </th><th> Seniority </th><th> Vote's percentage </th></tr>"]; 

    for (var i = 0; i < data.results[0].members.length; i++)
    {
      for (var j = 0; j < checked.length; j++)
      {
        if(data.results[0].members[i].party == checked[j]) 
        {
          if(data.results[0].members[i].url == "" && (data.results[0].members[i].state == selected || selected == "All States")) 

          {
            tableRow.push("<tr><td>" + names[i] +"</td><td>"+ data.results[0].members[i].party +"</td><td>"+
            data.results[0].members[i].state +"</td><td>"+ data.results[0].members[i].seniority +
            "</td><td>"+ data.results[0].members[i].votes_with_party_pct +"% </td></tr>");

          }
          else if(data.results[0].members[i].state == selected || selected == "All States")
          {
            tableRow.push("<tr><td>"+'<a href="' + data.results[0].members[i].url + '">' + names[i] +"</a></td><td>"+ data.results[0].members[i].party +"</td><td>"+
            data.results[0].members[i].state +"</td><td>"+ data.results[0].members[i].seniority +
            "</td><td>"+ data.results[0].members[i].votes_with_party_pct +"% </td></tr>");
          }
        }
      }
    }

    return tableRow.join(""); //tableRow array returned as a string without any comas or spacing with the .join("") property
  }

  function selectOptions()
  {
    var statesRow = ["<option>All States</option>"];
    var states = [];

    for (var i = 0; i < data.results[0].members.length; i++)
    {
      if(states.indexOf(data.results[0].members[i].state) < 0) states.push(data.results[0].members[i].state);
    }
    for (var x = 0; x < states.length; x++) {
      statesRow.push("<option>" + states[x] + "</option>");
    }
    return statesRow.join("");
  }

  function getCheckedBoxes(chkboxName)
  {
    var checkboxes = document.getElementsByName(chkboxName);
    var checkboxesChecked = [];
    // loop over them all
    for (var i=0; i<checkboxes.length; i++)
    {
       // And stick the checked ones onto an array...
       if (checkboxes[i].checked) {
          checkboxesChecked.push(checkboxes[i].value);
       }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
  }

  function getSelectedState(stateName)
  {
    var select = (document.getElementsByName(stateName));
    var stateSelected = select[0].value;
    return stateSelected;
  }


