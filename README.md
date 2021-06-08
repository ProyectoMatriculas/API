<h1>API DOCUMENTATION:</h1>
    Las URLs de los endpoints se construyen de la siguiente manera:
    <br>
    <b>https://matriculas-api.herokuapp.com</b> {endpoint}
    <h2>LOGIN</h2>
    <p>Endpoints dirigidos a controlar los logins, tanto de usuarios (APP) como de administradores (DESKTOP)
    <h3>User Login</h3>
    <h4>REQUEST</h4>
    <table style="width:100%">
        <tr>
            <th colspan="5">Request: JSON(body)</th>
        </tr>
        <tr>
            <th colspan="5">POST /login/student</th>
        </tr>
        <tr>
            <th>Param</th>
            <th>Value</th>
            <th colspan="3">Description</th>
        </tr>
        <tr>
            <td>email</td>
            <td>text</td>
            <td colspan="3">User email</td>
        </tr>
        <tr>
            <td>password</td>
            <td>text</td>
            <td colspan="3">User password</td>
        </tr>
    </table>
    <br>
    <h4>RESPONSE STATUS 200</h4>
    <table style="width:100%">
        <tr>
            <th colspan="5">Response: JSON</th>
        </tr>
        <tr>
            <th colspan="5">POST /login/student</th>
        </tr>
        <tr>
            <th>Param</th>
            <th>Value</th>
            <th colspan="3">Description</th>
        </tr>
        <tr>
            <td>token</td>
            <td>text</td>
            <td colspan="3">It returns the user session token</td>
        </tr>
    </table>
    <br>
    <h4>RESPONSE  STATUS 400</h4>
    <table style="width:100%">
        <tr>
            <th colspan="5">Response: JSON</th>
        </tr>
        <tr>
            <th colspan="5">POST /login/student</th>
        </tr>
        <tr>
            <th>Param</th>
            <th>Value</th>
            <th colspan="3">Description</th>
        </tr>
        <tr>
            <td>Message</td>
            <td>text</td>
            <td colspan="3">Error message</td>
        </tr>
    </table>
    <br>
    <h3>Admin Login</h3>
   <h4>REQUEST</h4>
    <table style="width:100%">
        <tr>
            <th colspan="5">Request: JSON(body)</th>
        </tr>
        <tr>
            <th colspan="5">POST /login/admin</th>
        </tr>
        <tr>
            <th>Param</th>
            <th>Value</th>
            <th colspan="3">Description</th>
        </tr>
        <tr>
            <td>email</td>
            <td>text</td>
            <td colspan="3">Admin email</td>
        </tr>
        <tr>
            <td>password</td>
            <td>text</td>
            <td colspan="3">Admin password</td>
        </tr>
    </table>
    <br>
    <h4>RESPONSE STATUS 200</h4>
    <table style="width:100%">
        <tr>
            <th colspan="5">Response: JSON</th>
        </tr>
        <tr>
            <th colspan="5">POST /login/admin</th>
        </tr>
        <tr>
            <th>Param</th>
            <th>Value</th>
            <th colspan="3">Description</th>
        </tr>
        <tr>
            <td>token</td>
            <td>text</td>
            <td colspan="3">It returns the admin session token</td>
        </tr>
    </table>
    <br>
    <h4>RESPONSE  STATUS 400</h4>
    <table style="width:100%">
        <tr>
            <th colspan="5">Response: JSON</th>
        </tr>
        <tr>
            <th colspan="5">POST /login/admin</th>
        </tr>
        <tr>
            <th>Param</th>
            <th>Value</th>
            <th colspan="3">Description</th>
        </tr>
        <tr>
            <td>Message</td>
            <td>text</td>
            <td colspan="3">Error message</td>
        </tr>
    </table>
    <br>
