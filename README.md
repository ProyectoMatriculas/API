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
    <h2>CRUD Courses</h2>
    <p>Endpoints dirigidos a gestionar los Cursos mediante la BBDD, lectura, escritura, actualización y eliminación.
    <h3>Create Courses</h3>
    <h4>REQUEST</h4>
    <table style="width:100%">
        <tr>
            <th colspan="5">Request: JSON(body)</th>
        </tr>
        <tr>
            <th colspan="5">POST /courses/create</th>
        </tr>
        <tr>
            <th>Param</th>
            <th>Value</th>
            <th colspan="3">Description</th>
        </tr>
        <tr>
            <td>CODI_CICLE_FORMATIU</td>
            <td>text</td>
            <td colspan="3">Codigo del ciclo</td>
        </tr>
        <tr>
            <td>NOM_CICLE_FORMATIU</td>
            <td>text</td>
            <td colspan="3">Nombre del ciclo</td>
        </tr>
        <tr>
            <td>CODI_ADAPTACIO_CURRICULAR</td>
            <td>text</td>
            <td colspan="3">Codigo de adaptacion curricular</td>
        </tr>
        <tr>
            <td>HORES_CICLE_FORMATIU</td>
            <td>int</td>
            <td colspan="3">Horas de duracion del ciclo</td>
        </tr>
    <tr>
            <td>DATA_INICI_CICLE_FORMATIU</td>
            <td>date</td>
            <td colspan="3">Horas de duracion del ciclo</td>
        </tr>
    <tr>
            <td>DATA_FI_CICLE_FORMATIU</td>
            <td>date</td>
            <td colspan="3">Horas de duracion del ciclo</td>
        </tr>
     <tr>
            <td>MODULS_CICLE_FORMATIU</td>
            <td>Array</td>
            <td colspan="3">Lista de modulos del ciclo</td>
        </tr>
    <tr>
            <td>INDICADOR_FCT</td>
            <td>text</td>
            <td colspan="3">S / N referente a SI / NO</td>
        </tr>
    <tr>
            <td>INDICADOR_SINTESIS</td>
            <td>text</td>
            <td colspan="3">S / N referente a SI / NO</td>
        </tr>
    <tr>
            <td>INDICADOR_IDIOMA</td>
            <td>text</td>
            <td colspan="3">S / N referente a SI / NO</td>
        </tr>
    <tr>
            <td>INDICADOR_PROJECTE</td>
            <td>text</td>
            <td colspan="3">S / N referente a SI / NO</td>
        </tr>
    </table>
    <br>
    <h4>RESPONSE STATUS 200</h4>
    <table style="width:100%">
        <tr>
            <th colspan="5">Response: JSON</th>
        </tr>
        <tr>
            <th colspan="5">POST /courses/create</th>
        </tr>
        <tr>
            <th>Param</th>
            <th>Value</th>
            <th colspan="3">Description</th>
        </tr>
        <tr>
            <td>Message</td>
            <td>text</td>
            <td colspan="3">Mensaje afirmativo</td>
        </tr>
    </table>
    <br>
    <h4>RESPONSE  STATUS 400</h4>
    <table style="width:100%">
        <tr>
            <th colspan="5">Response: JSON</th>
        </tr>
        <tr>
            <th colspan="5">POST /courses/create</th>
        </tr>
        <tr>
            <th>Param</th>
            <th>Value</th>
            <th colspan="3">Description</th>
        </tr>
        <tr>
            <td>Message</td>
            <td>text</td>
            <td colspan="3">Mensaje de error</td>
        </tr>
    </table>
    <br>
    
