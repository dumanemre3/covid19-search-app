import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";

function App() {
  const [veri, setVeri] = useState("");
  const [tarih, setTarih] = useState("");
  useEffect(() => {
    if (tarih.length === 10)
      axios
        .get(
          "https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.json"
        )
        .then((res) => setVeri(res.data[tarih]));
  }, [tarih]);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto mt-4">
            <h2 className="text-center text-white display-3 ">
              TURKİYE COVİD-19 ARAMA MOTORU
            </h2>
            <br></br>
            <h4 className="text-warning text-center bg-primary rounded-3">
              Lütfen öğrenmek istediğiniz tarih aralığını, Gün - Ay - Yıl
              şeklinde giriniz.
            </h4>
            <div className="row">
              <div className="col-md-10">
                <InputMask
                  mask="99/99/9999"
                  type="text"
                  placeholder="GG/AA/YY"
                  className="form-control"
                  value={tarih}
                  onChange={(e) => setTarih(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.charCode == 13) {
                      e.preventDefault();
                      // alert("Enter'a basıldı.");
                      setTarih("");
                      setVeri("");
                    }
                  }}
                />
              </div>
              <button
                className="col-md-2 bg-danger text-white rounded-3"
                onClick={() => {
                  setTarih("");
                  setVeri("");
                }}
              >
                Tarihi Sil
              </button>
            </div>
            <br></br>
            <table class="table table-striped text-white ">
              <thead>
                <tr>
                  <th scope="col">Tarih</th>
                  <th scope="col">Test Sayısı</th>
                  <th scope="col">Hasta Sayısı</th>
                  <th scope="col">Vefat Sayısı</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className="text-white"
                  className={veri === undefined ? "bg-danger" : "bg-success"}
                >
                  <th scope="row">
                    {veri === undefined ? "Veri Bekleniyor" : veri.date}
                  </th>
                  <td>
                    {veri === undefined ? "Veri Bekleniyor" : veri.totalTests}
                  </td>
                  <td>
                    {veri === undefined ? "Veri Bekleniyor" : veri.patients}
                  </td>
                  <td>
                    {veri === undefined ? "Veri Bekleniyor" : veri.deaths}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
