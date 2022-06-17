pragma solidity >= 0.4.22;

import "./IERC20.sol";

contract ParkingChain is IERC20 {


    struct driver{
        bool payStatus ;
        uint timeEnter ;
        uint timeOut ;
        uint number ; 
        string license ;
        uint expense;
        bool registed;
        bool inside;
        Payment[] record;
    }

    struct Payment{
        uint timeEnter ;
        uint timeOut ;
        uint dollars ;
        bool pay ;
    }

    mapping(address => Payment) private Payments;

    // Payment[] private payment;

    string private _name;
    string private _symbol;
    uint8 private _decimals = 18;

    uint256 private _totalSupply; 


    uint public totalLots; //車位數量
    uint public remainingLots; //可停車位數量

    uint public perHalfHour ;
    uint public MaximumInOneday ;

    address public parkingLotOwner ;


    mapping(address => uint256) private balances;

    mapping(address => mapping(address => uint256)) private allowances;

    mapping(address => driver) private drivers;

    mapping(string => address) private licenses;
    
    constructor(string memory name_, string memory symbol_, uint256 initialSupply, uint parkingLots , uint perHalfHour_ , uint MaximumInOneday_) {     

        _totalSupply = initialSupply * 10 ** uint256(_decimals); //Lab1?

        balances[msg.sender] = _totalSupply;

        perHalfHour = perHalfHour_;
        MaximumInOneday = MaximumInOneday_;
        _name = name_;
        _symbol = symbol_;
        parkingLotOwner = msg.sender;
        totalLots = parkingLots;
        remainingLots = totalLots;
    }

//以下為擴充function
    function setStatus (address _driver,bool _bool) internal {
        drivers[_driver].payStatus = _bool;
    }

//註冊(User)
    function register (string memory _license) public returns(bool) {
        require(!drivers[msg.sender].registed ,"Error");
        drivers[msg.sender].registed = true;
        drivers[msg.sender].license = _license;
        licenses[_license] = msg.sender;
        drivers[msg.sender].payStatus = true;
        drivers[msg.sender].inside = false;
        return true;
    }

//ParkingLotOwner開門-In(Deployer)
    function parkingIn(string memory _license) public returns(address){
        require(msg.sender == parkingLotOwner); //需要確認
        require(remainingLots >= 0 ,"No empty lot");
        // require(balances[licenses[_license]] >= perHalfHour,"You don't have enough money");
        require(drivers[licenses[_license]].payStatus == true ,"Pay!!!");
        require(drivers[licenses[_license]].inside==false,"Error_ParkingIn");
        setStatus(licenses[_license],false);
        drivers[licenses[_license]].timeEnter = block.timestamp;
        drivers[licenses[_license]].inside = true;
        remainingLots -= 1;
        return licenses[_license];
    }

//ParkingLotOwner開門-Out(Deployer)
    function parkingOut(string memory _license) public returns(bool){
        require(drivers[licenses[_license]].inside==true,"Error_ParkingOut");
        drivers[licenses[_license]].timeOut = block.timestamp;
        uint TotalExpense = CountTime(drivers[licenses[_license]].timeEnter , drivers[licenses[_license]].timeOut)*perHalfHour;
        if (TotalExpense <= MaximumInOneday){
            TotalExpense = TotalExpense;
        }
        else{
            TotalExpense = MaximumInOneday;
        }
        drivers[licenses[_license]].expense = TotalExpense;
        Payments[licenses[_license]].timeEnter = drivers[licenses[_license]].timeEnter;
        Payments[licenses[_license]].timeOut = drivers[licenses[_license]].timeOut;
        Payments[licenses[_license]].dollars = TotalExpense;
        Payments[licenses[_license]].pay = drivers[licenses[_license]].payStatus;
        drivers[licenses[_license]].record.push((Payments[licenses[_license]]));
        drivers[licenses[_license]].inside = false;
        remainingLots += 1;
    }

    function search_driver() public returns(Payment[] memory){
        return drivers[msg.sender].record;
    } 
    
    function search_Deployer(string memory _license) public returns(Payment[] memory){
        require(msg.sender == parkingLotOwner,"No Rights");
        return drivers[licenses[_license]].record;
    } 


//繳費
    function pay() public returns(bool){ 
        require(balances[msg.sender] >= drivers[msg.sender].expense,"Don't have enough money");
        require(drivers[msg.sender].inside==false,"Error_Pay");
        transfer(parkingLotOwner , drivers[msg.sender].expense);
        setStatus(msg.sender,true);
        uint num = drivers[msg.sender].record.length - 1 ;
        drivers[msg.sender].record[num].pay = true;
        return true;

    }

//計時
    function CountTime(uint In , uint Out) internal pure returns(uint){
        uint halfHours ;
        uint num = (Out - In)%1800 ;
        if ( num != 0){
            halfHours = ((Out - In - num )%1800)+1;
        }
        else{
            halfHours = ((Out - In - num)%1800);
        }
        return halfHours;
    }

    // function checkStatus(string memory _license) public returns(bool){
    //     require(msg.sender == parkingLotOwner);
    //     if (drivers[licenses[_license]].payStatus == true )
    //     {
    //         remainingLots += 1;
    //     return true;
    //     }
    //     return false;
    // }


//以下為ERC20
    function name() public view  override returns (string memory) {
        return _name;
    }

    function symbol() public view  override returns (string memory) {
        return _symbol;
    }

    function decimals() public view  override returns (uint8) {
        return _decimals;
    }

    function totalSupply() public view  override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address _account) public view override returns (uint256) {
        return balances[_account];
    }

    function transfer(address _to, uint256 _value) public override returns (bool) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;

        emit Transfer(msg.sender,_to,_value);
        return true;
    }

    function allowance(address _owner, address _spender) public view override returns (uint256) {
        return allowances[_owner][_spender];
    }

    function approve(address spender, uint256 _value) public  override returns (bool) {
        allowances[msg.sender][spender] += _value ;
        emit Approval(msg.sender,spender,_value) ;
        return true ; 
    }

    function transferFrom(address _from, address _to, uint256 _value) public  override returns (bool) {
        require(_value <= allowances[_from][msg.sender]);
        allowances[_from][msg.sender] -= _value;
        
        require(balances[_from] >= _value);
        balances[_from] -= _value;
        balances[_to] += _value;   

        emit Transfer(_from , _to , _value);

        return true;
    }

    function getInfoIn(address _address) public view returns(uint){
        return drivers[_address].timeEnter;
    }

    function getInfoOut(address _address) public view returns(uint){
        return drivers[_address].timeOut;
    }

}