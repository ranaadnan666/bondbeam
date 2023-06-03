import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "../../../../src/index.css"
import moment from "moment";
import { Avatar } from '@mui/material';
import CreateCompaigns from '../compaign/CreateCompaign';
import CreateGroupCompaign from '../compaign/CreateGroup';
import { DeleteCompaign, DeleteCompaignGroup } from '../../../utils/helpers/advertisement/advertisement_crud';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}





const Analytics=(props)=> {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


// menu bar
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleClick1 = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = props?.row?.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

 


  // ===================== delete compaign group   =====================

const DeleteGroupById=async(id,index)=>{
  const lsUser=JSON.parse(localStorage.getItem("userLoggedIn"))
  const response =await DeleteCompaignGroup(id, lsUser.token.access)
  if (response.status || response.status === 200) {
    const newArray = props?.row.filter((_, i) => i !== index);
    props?.setGroups(newArray);
  }
     else{
      alert("something went wrong")
     }

}
 

  // ===================== delete compaign   =====================

const DeletecompaignById=async(id,index)=>{
  const lsUser=JSON.parse(localStorage.getItem("userLoggedIn"))
  const response =await DeleteCompaign(id, lsUser.token.access)
  if (response.status || response.status === 200) {
    const newArray = props?.row.filter((_, i) => i !== index);
    props?.setCompaign(newArray);
  }
     else{
      alert("something went wrong")
     }

}

// column data

function EnhancedTableHead() {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };


  return (
    <TableHead>
      <TableRow>
      {props?.column?.map((headCell) => (
            <TableCell
              key={headCell.id}
              sx={{ fontSize: "1.1rem", fontWeight: "500"}}
              align={"center"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};



  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props?.row?.length) : 0;

  return (
    <Box p={1} sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 650 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props?.row?.length}
            />
            <TableBody>
              {stableSort(props?.row, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                    
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                 
                 <TableCell
                   
                   component="th"
                   id={labelId}
                   scope="row"
                   padding="5px"
                 >
                   {index + 1}
                 </TableCell>
                      <TableCell
                   
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="5px"
                      >
                        {row.name}
                      </TableCell>
                      {
                        props.title==="compaign" ? <TableCell align="center"><Avatar  src={row.media}/></TableCell>:null
                      }
                      <TableCell align="center">{row.impression}</TableCell>
                      <TableCell align="center">{ props.title==="compaign" ? row.spent : row.spend}</TableCell>
                      <TableCell align="center">{row.clicks}</TableCell>
                      <TableCell align="center">{row.bid}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      {
                        props.title==="compaign" ? <TableCell align="center">{row.type}</TableCell>:null
                      }
                      <TableCell align="center" width={"110px"}> {moment(row.start_datet).format("h:mm d-MM-yy")}</TableCell>
                      <TableCell align="center" width={"110px"}>{moment(row.end_date).format("h:mm d-MM-yy")}</TableCell>
                      <TableCell align="center" width={"110px"}>{moment(row.created_at).format("h:mm d-MM-yy")}</TableCell>
                      <TableCell align="center">
                      <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick1}
      >
        <MoreVertIcon/>
      </Button>
      <Menu
     
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem >{props.title==="compaign" ? <CreateCompaigns id={row.id} item={props?.row} title={"Edit"}/>:<CreateGroupCompaign id={row.id} item={props?.row} title={"Edit"}/>}</MenuItem>
        {props.title==="compaign" ? <MenuItem onClick={()=>{DeletecompaignById(row.id,index);handleClose()}}>Delete</MenuItem> : <MenuItem onClick={()=>{DeleteGroupById(row.id,index);handleClose()}} >Delete</MenuItem>}
      </Menu>
    </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={props?.row?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

export default Analytics
