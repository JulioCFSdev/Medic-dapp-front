// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalRecords {
    struct Exam {
        string title;
        string doctor;
        uint256 examDate;
        string location;
        string pdfHash;
    }

    struct Patient {
        address wallet;
        string qrCode;
        Exam[] exams;
    }

    mapping(address => Patient) public patients;
    mapping(address => bool) public doctors;

    modifier onlyDoctor() {
        require(doctors[msg.sender], "Only doctors can call this function");
        _;
    }

    constructor() {
        doctors[msg.sender] = true; // Deployer is a doctor
    }

    function addDoctor(address _doctor) public onlyDoctor {
        doctors[_doctor] = true;
    }

    function submitExam(
        string memory _title,
        string memory _doctor,
        uint256 _examDate,
        string memory _location,
        string memory _pdfHash
    ) public {
        require(bytes(_title).length > 0, "Title is required");
        require(bytes(_doctor).length > 0, "Doctor name is required");
        require(_examDate > 0, "Exam date is required");
        require(bytes(_location).length > 0, "Location is required");
        require(bytes(_pdfHash).length > 0, "PDF hash is required");

        Exam memory newExam = Exam({
            title: _title,
            doctor: _doctor,
            examDate: _examDate,
            location: _location,
            pdfHash: _pdfHash
        });

        patients[msg.sender].exams.push(newExam);
    }

    function generateQRCode(string memory _qrCode) public {
        patients[msg.sender].qrCode = _qrCode;
    }

    function getPatientExams(address _patient) public view returns (Exam[] memory) {
        return patients[_patient].exams;
    }

    function getPatientQRCode(address _patient) public view returns (string memory) {
        return patients[_patient].qrCode;
    }
}
