var NoCoPay = artifacts.require("./NoCoPay.sol");

contract("NoCoPay", function(accounts){

  it("should add a doctor in the registry", function(){

    var registry;

    return NoCoPay.deployed().then( function(instance){

      registry = instance;

      var account_one = accounts[0];
      var name = "Michael Nolivos";
      var specialty = "chiropractor";

      return instance.register( account_one, name, specialty );
    }).then( function(){

      return registry.numRecords.call()

    }).then( function( count ){

      assert.equal( count, 1 )
    })

  })

  it("should assign a patient to a provider", function(){

    var _instance;

    var patient = accounts[1];
    var doctor = accounts[0];

    return NoCoPay.deployed().then( function(instance){

      _instance = instance;

      return instance.assignProvider(patient, doctor);

    }).then(function(tx){

      return _instance.getPatientCount( doctor );

    }).then(function(count){

      assert.equal( count, 1 );

      return _instance.getPatientAtIndex( doctor, count - 1 );

    }).then( function( patientAddress ){

      assert.equal( patient, patientAddress )
    })

  })
})

  // it("should check if provider hash is equal to relationship hash", function()) {
  //   var _instance;
  //
  //   var patient = accounts[1];
  //   var doctor = accounts[0];
  //
  //
  //   var hash = "test"
  //
  //   return NoCoPay.deployed().then( function (instance) {
  //     _instance = instance;
  //     return instance.providerCheck(doctor, patient, )
  //   })
  // }
