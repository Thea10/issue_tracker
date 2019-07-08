loadIssues = () => {
    var issues = JSON.parse(localStorage.getItem("issues")) || [];
    var issueList = document.getElementById('issueList');

    issueList.innerHTML = " ";

    issues.forEach(issue => {
        var id = issue.id;
        var description = issue.description;
        var priority = issue.priority;
        var assignd = issue.assignd;
        var status = issue.status;

        issueList.innerHTML += `
        <div class = "well">
            <h6> Issue ID: ${id}</h6>
            <p> <span class="label label-info"> ${status}</span></p>
            <h3>${description}</h3>
            <p> <i class="glyphicon glyphicon-time"></i> ${priority} 
                <i class="glyphicon glyphicon-user"></i> ${assignd}</p>
            <a href="#" class="btn btn-primary" onclick="editIssue('${id}')">Edit</a>
            <a href="#" class="btn btn-warning" onclick="setstatusClose('${id}')">Close</a>
            <a href="#" class="btn btn-danger" onclick="deleteIssue('${id}')">Delete</a>
        </div>`
    });
}

saveIssue = (e) => {
  //  console.log(e);

    var issueId = chance.guid();
    var issueDesc = document.getElementById('issueDesc').value;
    var issuePriority = document.getElementById('issuePriority').value;
    var issueAssignment = document.getElementById('issueAssignment').value;

    var issueStatus = 'Open';
    var issues = JSON.parse(localStorage.getItem("issues")) || [];

    var issue = {
        id : issueId,
        description: issueDesc,
        priority: issuePriority,
        assignd: issueAssignment,
        status: issueStatus
    }

    issues.push(issue);

    localStorage.setItem("issues", JSON.stringify(issues));

    e.target.reset();
    loadIssues();
    e.preventDefault();
    
}

setstatusClose = (id) => {
    var issues = JSON.parse(localStorage.getItem("issues"));
    issues.forEach(issue => {
        if(issue.id == id){
            issue.status = "Closed";
        }
    });

    localStorage.setItem("issues", JSON.stringify(issues));
    loadIssues();
}


deleteIssue = (id) => {
    var issues = JSON.parse(localStorage.getItem("issues"));
    issues.forEach(issue => {
        if(issue.id == id){
            issues.splice(issue, 1);
        }
    });

    localStorage.setItem("issues", JSON.stringify(issues));
    loadIssues();
}

saveEditedIssue = (id) => {
    
    var issueId = id;
   // console.log(issueId);
    
    var issueDesc = document.getElementById('editissueDesc').value;
    var issuePriority = document.getElementById('editissuePriority').value;
    var issueAssignment = document.getElementById('editissueAssignment').value;

    var issueStatus = 'Open';
    var issues = JSON.parse(localStorage.getItem("issues")) || [];

    var issue = {
        id : issueId,
        description: issueDesc,
        priority: issuePriority,
        assignd: issueAssignment,
        status: issueStatus
    }

    issues.push(issue);

    localStorage.setItem("issues", JSON.stringify(issues));

    cancel();
    loadIssues();
}

editIssue = (id) => {
    var issues = JSON.parse(localStorage.getItem("issues"));
    issues.forEach(issue => {
        if(issue.id == id){      
          document.getElementById('modal').classList.add('show');
          document.getElementById('modal-content').innerHTML = `  <h3> Edit Issue: </h3>
          <form id="inputForm" onsubmit="saveEditedIssue('${id}')">
                        <div class="form-group">
                             <p> <span class="label label-info"> ${id}</span></p>
                            <label for="IssueInput">Description</label>
                            <input type="text" class="form-control" placeholder="Type new description for ${issue.description}" id="editissueDesc"> 
                        </div>
                        <div class="form-group">
                            <label for="IssueInput">Priority</label>
                            <select class="form-control" id="editissuePriority"> 
                                <option value="${issue.priority}"> Select new priority for ${issue.priority}</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="IssueInput">Assigned To</label>
                            <input type="text" class="form-control" placeholder=" Type new assignment  for ${issue.assignd}" id="editissueAssignment">
                        </div>   
                        <button type="submit" class="btn btn-primary">Add</button>

                        <button type="button" class="btn btn-danger" onclick="cancel(event)">Cancel</button>
                        
                    </form>`;
        }
    });

     // localStorage.setItem("issues", JSON.stringify(issues));
   // loadIssues();

  
}


cancel = (id) =>{
     document.getElementById('modal').classList.remove('show');
    // loadIssues();
}






