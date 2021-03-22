# API

<h1>Student login</h1>

<table>
<tbody><tr>
<th colspan="3">Request : JSON
</th></tr>
<tr>
<th colspan="3">POST /login/student
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>username
</td>
<td>text
</td>
<td>Nombre usuario
</td></tr>
<tr>
<td>password
</td>
<td>text
</td>
<td>Contraseña usuario
</td></tr>
</tbody>
</table>

<table>
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /login/student
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>status
</td>
<td>OK / ERROR
</td>
<td>Estado de la consulta
</td></tr>
<tr>
<td>message
</td>
<td>text
</td>
<td>OK: Devuelve el token / ERROR: Descripcion del error
</td></tr>
</tbody>
</table>


<h1>Admin Login</h1>

<table>
<tbody><tr>
<th colspan="3">Request&nbsp;: JSON
</th></tr>
<tr>
<th colspan="3">POST /login/admin
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>username
</td>
<td>text
</td>
<td>Nombre usuario
</td></tr>
<tr>
<td>password
</td>
<td>text
</td>
<td>Contraseña usuario
</td></tr>
</tbody></table>

<table>
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /login/admin
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>status
</td>
<td>OK / ERROR
</td>
<td>Estado de la consulta
</td></tr>
<tr>
<td>message
</td>
<td>text
</td>
<td>OK: Devuelve el token / ERROR: Descripcion del error
</td></tr>
</tbody>
</table>
