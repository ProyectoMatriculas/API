# API

<h1>Endpoints</h1>

<h2>Student login</h2>

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


<h2>Admin Login</h2>

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
<td>Nombre del usuario
</td></tr>
<tr>
<td>password
</td>
<td>text
</td>
<td>Contraseña del usuario
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

<h2>CRUD Courses</h2>

<h3>Create</h3>

<table>
<tbody><tr>
<th colspan="3">Request : JSON
</th></tr>
<tr>
<th colspan="3">POST /courses/create
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>course
</td>
<td>JSON {field: value, ...}
</td>
<td>Recibe un JSON con la información del curso
  </td></tr>
</tbody>
</table>

<table>
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /courses/create
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
<td>OK: Devuelve el nombre del curso creado / ERROR: Descripcion del error
</td></tr>
</tbody>
</table>

<h3>Read</h3>

<table>
<tbody><tr>
<th colspan="3">Request : JSON
</th></tr>
<tr>
<th colspan="3">GET /courses/read
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th>
</tr>
<tr>
<td>id
</td>
<td>Integer
</td>
<td>Recibe la ID del curso a leer
</tr>
<tr>
<td>limit
</td>
<td>Integer
</td>
<td>Recibe el numero de cursos que quiere seleccionar
  </td></tr>
  <td>query
</td>
<td>JSON {field: value, ...}
</td>
<td>Recibe el filtro para la query de los cursos que quiere seleccionar
  </td></tr>
</tbody>
</table>

<table>
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">GET /courses/read
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
<td>JSON {field: value, ...}
</td>
<td>OK: Devuelve el curso / lista de cursos / ERROR: Descripcion del error
</td></tr>
</tbody>
</table>

<h3>Update</h3>

<table>
<tbody><tr>
<th colspan="3">Request : JSON
</th></tr>
<tr>
<th colspan="3">POST /courses/update
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th>
</tr>
<tr>
<td>id
</td>
<td>Integer
</td>
<td>Recibe la ID del curso a actualizar
</tr>
<tr>
<td>values
</td>
<td>JSON {field: value, ...}
</td>
<td>Recibe los nuevos datos para el curso
  </td></tr>
  <td>query
</td>
<td>JSON {field: value, ...}
</td>
<td>Recibe el filtro para la query de los cursos que quiere seleccionar
  </td></tr>
</tbody>
</table>

<table>
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">POST /courses/update
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
<td>JSON {field: value, ...}
</td>
<td>OK: Devuelve el curso actualizado / ERROR: Descripcion del error
</td></tr>
</tbody>
</table>

<h3>Delete</h3>

<table>
<tbody><tr>
<th colspan="3">Request : JSON
</th></tr>
<tr>
<th colspan="3">DELETE /courses/delete
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th>
</tr>
<tr>
<td>id
</td>
<td>Integer
</td>
<td>Recibe la ID del curso a eliminar
</tr>
</tbody>
</table>

<table>
<tbody><tr>
<th colspan="3">Response : JSON
</th></tr>
<tr>
<th colspan="3">DELETE /courses/delete
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
<td>OK: Devuelve true / ERROR: Descripcion del error
</td></tr>
</tbody>
</table>
