"""
Generate CalcMyPower Solar Panel Wiring Diagrams Quick Reference PDF.
Outputs a print-ready, vector-sharp 2-page US Letter PDF at:
public/downloads/solar-panel-wiring-diagrams-quick-reference.pdf
"""

import os
import subprocess
import pypdfium2 as pdfium

def generate_pdf():
    output_dir = os.path.abspath('public/downloads')
    os.makedirs(output_dir, exist_ok=True)
    pdf_path = os.path.join(output_dir, 'solar-panel-wiring-diagrams-quick-reference.pdf')
    temp_html_path = os.path.abspath('temp_solar_wiring_doc.html')

    html_content = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>CalcMyPower Solar Panel Wiring Diagrams Quick Reference Guide</title>
<style>
  @page {
    size: letter portrait;
    margin: 0;
  }
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #0f172a;
    background: #ffffff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    width: 8.5in;
    height: 11in;
    padding: 0.35in 0.4in;
    position: relative;
    overflow: hidden;
    page-break-after: always;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .page-last {
    page-break-after: avoid;
  }

  /* Header Bar */
  .header-bar {
    border-bottom: 2px solid #0284c7;
    padding-bottom: 6px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .brand-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 3px;
  }
  .brand-badge {
    background: #0284c7;
    color: #ffffff;
    font-size: 8.5px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 2px 6px;
    border-radius: 3px;
  }
  .brand-sub {
    font-size: 8.5px;
    color: #64748b;
    font-weight: 600;
  }
  .doc-title {
    font-size: 15px;
    font-weight: 900;
    color: #0f172a;
    letter-spacing: -0.3px;
    line-height: 1.15;
  }
  .doc-subtitle {
    font-size: 8px;
    color: #475569;
    margin-top: 1px;
  }
  .header-meta {
    text-align: right;
    font-size: 7.5px;
    color: #64748b;
    line-height: 1.3;
  }
  .header-meta a {
    color: #0284c7;
    text-decoration: none;
    font-weight: 700;
  }

  /* Section Styles */
  .section-title {
    font-size: 9.5px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    color: #0f172a;
    border-left: 3px solid #0284c7;
    padding-left: 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .section-title span.badge {
    font-size: 7px;
    font-weight: 600;
    background: #f1f5f9;
    color: #475569;
    padding: 1px 5px;
    border-radius: 3px;
    border: 1px solid #e2e8f0;
  }

  /* Diagrams Grid (Page 1) */
  .diagrams-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 7px;
    margin-bottom: 8px;
  }
  .diagram-card {
    border: 1px solid #cbd5e1;
    border-radius: 5px;
    background: #ffffff;
    padding: 6px;
    display: flex;
    flex-direction: column;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 4px;
    margin-bottom: 4px;
  }
  .card-title {
    font-size: 9px;
    font-weight: 800;
    color: #0f172a;
  }
  .tag {
    font-size: 7px;
    font-weight: 700;
    padding: 1px 4px;
    border-radius: 2px;
  }
  .tag-series { background: #eff6ff; color: #1d4ed8; }
  .tag-parallel { background: #fffbeb; color: #b45309; }
  .tag-hybrid { background: #eef2ff; color: #4338ca; }

  .schematic-box {
    width: 100%;
    height: 105px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .metrics-box {
    background: #0f172a;
    color: #ffffff;
    border-radius: 3px;
    padding: 4px;
    margin-bottom: 5px;
    text-align: center;
    font-size: 7px;
    line-height: 1.35;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }
  .metrics-box .highlight {
    color: #38bdf8;
    font-weight: bold;
    font-size: 7.5px;
  }

  .notes-list {
    font-size: 7px;
    color: #334155;
    line-height: 1.3;
    list-style-type: disc;
    padding-left: 11px;
    margin-top: auto;
  }
  .notes-list li {
    margin-bottom: 2px;
  }
  .notes-list strong {
    color: #0f172a;
  }

  /* Table Styles */
  .table-container {
    margin-bottom: 8px;
  }
  table.ref-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 7.2px;
    text-align: left;
  }
  table.ref-table th {
    background: #0f172a;
    color: #ffffff;
    font-weight: 700;
    padding: 4px 6px;
    border: 1px solid #1e293b;
    text-transform: uppercase;
    font-size: 6.8px;
    letter-spacing: 0.3px;
  }
  table.ref-table td {
    padding: 3.5px 6px;
    border: 1px solid #cbd5e1;
    color: #334155;
    line-height: 1.25;
  }
  table.ref-table tr:nth-child(even) {
    background: #f8fafc;
  }
  table.ref-table tr.highlight-row {
    background: #eff6ff;
  }
  .val-num {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-weight: 600;
  }

  /* Callout / Warning Boxes */
  .callout-box {
    border-radius: 4px;
    padding: 5px 8px;
    font-size: 7.2px;
    line-height: 1.35;
    margin-bottom: 7px;
    display: flex;
    gap: 6px;
    align-items: flex-start;
  }
  .callout-info {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #166534;
  }
  .callout-warning {
    background: #fffbeb;
    border: 1px solid #fde68a;
    color: #92400e;
  }
  .callout-alert {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #991b1b;
  }
  .callout-title {
    font-weight: 800;
    text-transform: uppercase;
    font-size: 7px;
    letter-spacing: 0.3px;
    margin-bottom: 1px;
  }

  /* Full Architecture Schematic on Page 2 */
  .arch-schematic-container {
    width: 100%;
    height: 180px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 5px;
    margin-bottom: 7px;
    padding: 4px;
    position: relative;
  }

  .checklist-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 7px;
  }
  .checklist-card {
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    padding: 6px;
    background: #ffffff;
  }
  .card-subtitle {
    font-size: 8px;
    font-weight: 800;
    color: #0f172a;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 3px;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .checklist-items {
    font-size: 7px;
    line-height: 1.35;
    color: #334155;
    list-style: none;
  }
  .checklist-items li {
    position: relative;
    padding-left: 12px;
    margin-bottom: 3px;
  }
  .checklist-items li::before {
    content: "[x]";
    position: absolute;
    left: 0;
    color: #0284c7;
    font-weight: bold;
    font-family: monospace;
    font-size: 6.5px;
  }

  /* Citations Block */
  .citations-block {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    padding: 5px 8px;
    font-size: 6.8px;
    color: #475569;
    line-height: 1.3;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .citations-block a {
    color: #0284c7;
    text-decoration: underline;
  }

  /* Page Footer */
  .page-footer {
    border-top: 1px solid #cbd5e1;
    padding-top: 4px;
    margin-top: 4px;
    display: flex;
    justify-content: space-between;
    font-size: 6.8px;
    color: #64748b;
  }
  .page-footer .legal {
    font-weight: 600;
  }
</style>
</head>
<body>

<!-- ========================================== PAGE 1 ========================================== -->
<div class="page">
  <div>
    <!-- Header -->
    <div class="header-bar">
      <div>
        <div class="brand-row">
          <span class="brand-badge">CalcMyPower Engineering Reference</span>
          <span class="brand-sub">US National Electrical Code (NEC / NFPA 70) Standard</span>
        </div>
        <h1 class="doc-title">Solar Panel Array Wiring: Series, Parallel &amp; Series-Parallel</h1>
        <p class="doc-subtitle">Engineering Quick-Reference: Voltage, Current, Conductor Sizing, and Resistive Power-Loss Dynamics</p>
      </div>
      <div class="header-meta">
        <div><strong>Document ID:</strong> CMP-REF-SOLAR-01</div>
        <div><strong>Published:</strong> October 2026 | Ver 1.0</div>
        <div><strong>Full Interactive Guide:</strong> <a href="https://calcmypower.com/solar-panels-series-vs-parallel">calcmypower.com</a></div>
      </div>
    </div>

    <!-- Section: 3 Wiring Topologies -->
    <div class="section-title">
      <span>1. Primary Photovoltaic Array Wiring Configurations</span>
      <span class="badge">Benchmark: 200W Monocrystalline Module (Voc=24.3V, Vmp=20.4V, Isc=10.2A, Imp=9.8A)</span>
    </div>

    <div class="diagrams-grid">
      <!-- Series (2S) -->
      <div class="diagram-card">
        <div class="card-header">
          <span class="card-title">Series Connection (2S)</span>
          <span class="tag tag-series">Voltages Add</span>
        </div>
        <div class="schematic-box">
          <svg viewBox="0 0 240 105" width="100%" height="100%" style="font-family: sans-serif;">
            <!-- Module 1 -->
            <rect x="10" y="10" width="95" height="50" rx="3" fill="#1e293b" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="57" y="24" fill="#38bdf8" font-size="6.5" font-weight="bold" text-anchor="middle">PANEL 1 (200W)</text>
            <text x="57" y="36" fill="#f8fafc" font-size="5.5" text-anchor="middle">Vmp: 20.4V | Imp: 9.8A</text>
            <text x="57" y="47" fill="#94a3b8" font-size="5" text-anchor="middle">Voc: 24.3V | Isc: 10.2A</text>
            <circle cx="30" cy="60" r="3" fill="#1e3a8a"/><text x="30" y="62" fill="#fff" font-size="5" text-anchor="middle">-</text>
            <circle cx="85" cy="60" r="3" fill="#dc2626"/><text x="85" y="62" fill="#fff" font-size="5" text-anchor="middle">+</text>

            <!-- Module 2 -->
            <rect x="135" y="10" width="95" height="50" rx="3" fill="#1e293b" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="182" y="24" fill="#38bdf8" font-size="6.5" font-weight="bold" text-anchor="middle">PANEL 2 (200W)</text>
            <text x="182" y="36" fill="#f8fafc" font-size="5.5" text-anchor="middle">Vmp: 20.4V | Imp: 9.8A</text>
            <text x="182" y="47" fill="#94a3b8" font-size="5" text-anchor="middle">Voc: 24.3V | Isc: 10.2A</text>
            <circle cx="155" cy="60" r="3" fill="#1e3a8a"/><text x="155" y="62" fill="#fff" font-size="5" text-anchor="middle">-</text>
            <circle cx="210" cy="60" r="3" fill="#dc2626"/><text x="210" y="62" fill="#fff" font-size="5" text-anchor="middle">+</text>

            <!-- Series Jumper -->
            <path d="M 85 63 C 85 82, 155 82, 155 63" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,1.5"/>
            <rect x="105" y="74" width="30" height="9" rx="2" fill="#fff" stroke="#dc2626" stroke-width="0.8"/>
            <text x="120" y="80.5" fill="#dc2626" font-size="4.5" font-weight="bold" text-anchor="middle">Series Jumper</text>

            <!-- Feeds to Controller -->
            <path d="M 30 63 L 30 96 L 220 96" fill="none" stroke="#1e3a8a" stroke-width="1.5"/>
            <path d="M 210 63 L 210 89 L 220 89" fill="none" stroke="#dc2626" stroke-width="1.5"/>
            <text x="50" y="93" fill="#1e3a8a" font-size="4.5" font-weight="bold">Negative (-) [9.8A]</text>
            <text x="160" y="86" fill="#dc2626" font-size="4.5" font-weight="bold">Positive (+) [9.8A]</text>
          </svg>
        </div>
        <div class="metrics-box">
          <div class="highlight">TOTAL ARRAY: 400W</div>
          <div>Vmp: 40.8V (Doubled) | Imp: 9.80A (Same)</div>
          <div>Voc: 48.6V | Isc: 10.20A</div>
        </div>
        <ul class="notes-list">
          <li><strong>Physics:</strong> V_total = V1 + V2; I_total = I1 = I2.</li>
          <li><strong>Copper Efficiency:</strong> Doubles voltage, cutting current in half; reduces line power loss (I²R) by 75%.</li>
          <li><strong>Wire Sizing:</strong> Allows smaller conductors (10-12 AWG) on long runs (50-100 ft).</li>
          <li><strong>Shading Impact:</strong> Shading on one cell drops current through the entire string.</li>
          <li><strong>Controller:</strong> Requires an MPPT solar charge controller.</li>
        </ul>
      </div>

      <!-- Parallel (2P) -->
      <div class="diagram-card">
        <div class="card-header">
          <span class="card-title">Parallel Connection (2P)</span>
          <span class="tag tag-parallel">Current Adds</span>
        </div>
        <div class="schematic-box">
          <svg viewBox="0 0 240 105" width="100%" height="100%" style="font-family: sans-serif;">
            <!-- Module 1 -->
            <rect x="10" y="10" width="95" height="50" rx="3" fill="#1e293b" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="57" y="24" fill="#38bdf8" font-size="6.5" font-weight="bold" text-anchor="middle">PANEL 1 (200W)</text>
            <text x="57" y="36" fill="#f8fafc" font-size="5.5" text-anchor="middle">Vmp: 20.4V | Imp: 9.8A</text>
            <text x="57" y="47" fill="#94a3b8" font-size="5" text-anchor="middle">Voc: 24.3V | Isc: 10.2A</text>
            <circle cx="30" cy="60" r="3" fill="#1e3a8a"/><text x="30" y="62" fill="#fff" font-size="5" text-anchor="middle">-</text>
            <circle cx="85" cy="60" r="3" fill="#dc2626"/><text x="85" y="62" fill="#fff" font-size="5" text-anchor="middle">+</text>

            <!-- Module 2 -->
            <rect x="135" y="10" width="95" height="50" rx="3" fill="#1e293b" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="182" y="24" fill="#38bdf8" font-size="6.5" font-weight="bold" text-anchor="middle">PANEL 2 (200W)</text>
            <text x="182" y="36" fill="#f8fafc" font-size="5.5" text-anchor="middle">Vmp: 20.4V | Imp: 9.8A</text>
            <text x="182" y="47" fill="#94a3b8" font-size="5" text-anchor="middle">Voc: 24.3V | Isc: 10.2A</text>
            <circle cx="155" cy="60" r="3" fill="#1e3a8a"/><text x="155" y="62" fill="#fff" font-size="5" text-anchor="middle">-</text>
            <circle cx="210" cy="60" r="3" fill="#dc2626"/><text x="210" y="62" fill="#fff" font-size="5" text-anchor="middle">+</text>

            <!-- Branch Y-Connectors -->
            <!-- Positive combiner -->
            <path d="M 85 63 L 85 76 L 125 76" fill="none" stroke="#dc2626" stroke-width="1.2"/>
            <path d="M 210 63 L 210 76 L 125 76" fill="none" stroke="#dc2626" stroke-width="1.2"/>
            <circle cx="125" cy="76" r="3" fill="#dc2626"/>
            <path d="M 125 76 L 125 84 L 225 84" fill="none" stroke="#dc2626" stroke-width="2"/>
            <text x="165" y="81" fill="#dc2626" font-size="4.5" font-weight="bold">Combined (+) [19.6A]</text>

            <!-- Negative combiner -->
            <path d="M 30 63 L 30 92 L 105 92" fill="none" stroke="#1e3a8a" stroke-width="1.2"/>
            <path d="M 155 63 L 155 92 L 105 92" fill="none" stroke="#1e3a8a" stroke-width="1.2"/>
            <circle cx="105" cy="92" r="3" fill="#1e3a8a"/>
            <path d="M 105 92 L 105 99 L 225 99" fill="none" stroke="#1e3a8a" stroke-width="2"/>
            <text x="165" y="96" fill="#1e3a8a" font-size="4.5" font-weight="bold">Combined (-) [19.6A]</text>
          </svg>
        </div>
        <div class="metrics-box">
          <div class="highlight">TOTAL ARRAY: 400W</div>
          <div>Vmp: 20.4V (Same) | Imp: 19.60A (Doubled)</div>
          <div>Voc: 24.3V | Isc: 20.40A</div>
        </div>
        <ul class="notes-list">
          <li><strong>Physics:</strong> V_total = V1 = V2; I_total = I1 + I2.</li>
          <li><strong>High Current:</strong> Amperage doubles, multiplying resistive voltage drop unless wire gauge is increased.</li>
          <li><strong>Wire Sizing:</strong> Demands heavy 8 AWG or 6 AWG copper cables even over short runs.</li>
          <li><strong>Shading Impact:</strong> Shaded panel does not pull down current of parallel neighbor.</li>
          <li><strong>Controller:</strong> Compatible with both PWM and MPPT charge controllers.</li>
        </ul>
      </div>

      <!-- Series-Parallel (2S2P) -->
      <div class="diagram-card">
        <div class="card-header">
          <span class="card-title">Series-Parallel (2S2P)</span>
          <span class="tag tag-hybrid">Balanced Array</span>
        </div>
        <div class="schematic-box">
          <svg viewBox="0 0 240 105" width="100%" height="100%" style="font-family: sans-serif;">
            <!-- String A (Top Row) -->
            <rect x="10" y="8" width="95" height="38" rx="2.5" fill="#1e293b" stroke="#0ea5e9" stroke-width="1"/>
            <text x="57" y="19" fill="#38bdf8" font-size="5" font-weight="bold" text-anchor="middle">STRING A: PANEL 1</text>
            <text x="57" y="28" fill="#f8fafc" font-size="4.5" text-anchor="middle">200W | 20.4V | 9.8A</text>
            <circle cx="25" cy="46" r="2" fill="#1e3a8a"/>
            <circle cx="85" cy="46" r="2" fill="#dc2626"/>

            <rect x="135" y="8" width="95" height="38" rx="2.5" fill="#1e293b" stroke="#0ea5e9" stroke-width="1"/>
            <text x="182" y="19" fill="#38bdf8" font-size="5" font-weight="bold" text-anchor="middle">STRING A: PANEL 2</text>
            <text x="182" y="28" fill="#f8fafc" font-size="4.5" text-anchor="middle">200W | 20.4V | 9.8A</text>
            <circle cx="150" cy="46" r="2" fill="#1e3a8a"/>
            <circle cx="210" cy="46" r="2" fill="#dc2626"/>

            <!-- Jumper String A -->
            <path d="M 85 46 C 85 55, 150 55, 150 46" fill="none" stroke="#dc2626" stroke-width="1" stroke-dasharray="2,1"/>

            <!-- String B (Bottom Row) -->
            <rect x="10" y="52" width="95" height="38" rx="2.5" fill="#1e293b" stroke="#0ea5e9" stroke-width="1"/>
            <text x="57" y="63" fill="#38bdf8" font-size="5" font-weight="bold" text-anchor="middle">STRING B: PANEL 3</text>
            <text x="57" y="72" fill="#f8fafc" font-size="4.5" text-anchor="middle">200W | 20.4V | 9.8A</text>
            <circle cx="25" cy="90" r="2" fill="#1e3a8a"/>
            <circle cx="85" cy="90" r="2" fill="#dc2626"/>

            <rect x="135" y="52" width="95" height="38" rx="2.5" fill="#1e293b" stroke="#0ea5e9" stroke-width="1"/>
            <text x="182" y="63" fill="#38bdf8" font-size="5" font-weight="bold" text-anchor="middle">STRING B: PANEL 4</text>
            <text x="182" y="72" fill="#f8fafc" font-size="4.5" text-anchor="middle">200W | 20.4V | 9.8A</text>
            <circle cx="150" cy="90" r="2" fill="#1e3a8a"/>
            <circle cx="210" cy="90" r="2" fill="#dc2626"/>

            <!-- Jumper String B -->
            <path d="M 85 90 C 85 99, 150 99, 150 90" fill="none" stroke="#dc2626" stroke-width="1" stroke-dasharray="2,1"/>

            <!-- Combined Feeds -->
            <path d="M 210 46 L 225 46 L 225 90 L 210 90" fill="none" stroke="#dc2626" stroke-width="1.5"/>
            <circle cx="225" cy="68" r="2.5" fill="#dc2626"/>
            <path d="M 225 68 L 235 68" fill="none" stroke="#dc2626" stroke-width="2"/>

            <path d="M 25 46 L 5 46 L 5 90 L 25 90" fill="none" stroke="#1e3a8a" stroke-width="1.5"/>
            <circle cx="5" cy="68" r="2.5" fill="#1e3a8a"/>
            <path d="M 5 68 L 0 68" fill="none" stroke="#1e3a8a" stroke-width="2"/>
          </svg>
        </div>
        <div class="metrics-box">
          <div class="highlight">TOTAL ARRAY: 800W</div>
          <div>Vmp: 40.8V (Doubled) | Imp: 19.60A (Doubled)</div>
          <div>Voc: 48.6V | Isc: 20.40A</div>
        </div>
        <ul class="notes-list">
          <li><strong>Physics:</strong> Two series strings connected in parallel.</li>
          <li><strong>Balanced Limits:</strong> Keeps voltage within MPPT 100-150V limits while keeping current within 20A branch limits.</li>
          <li><strong>Wire Sizing:</strong> Standard 10 AWG solar PV wire handles home-run transmission.</li>
          <li><strong>Scale:</strong> The standard layout for residential and cabin arrays with 4 or more panels.</li>
          <li><strong>Controller:</strong> Requires an MPPT solar charge controller.</li>
        </ul>
      </div>
    </div>

    <!-- Section: Comparison Table -->
    <div class="section-title">
      <span>2. Electrical Circuit Matrix &amp; Operating Characteristics</span>
      <span class="badge">STC: 1,000 W/m², 25°C Cell Temp, AM 1.5</span>
    </div>
    <div class="table-container">
      <table class="ref-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Series (2S)</th>
            <th>Parallel (2P)</th>
            <th>Series-Parallel (2S2P)</th>
            <th>Circuit Formula &amp; Engineering Rationale</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Operating Voltage (Vmp)</strong></td>
            <td class="val-num" style="color:#1d4ed8;">40.8 V</td>
            <td class="val-num">20.4 V</td>
            <td class="val-num" style="color:#4338ca;">40.8 V</td>
            <td>Series: V_total = V1 + V2. Parallel: V_total = V_module.</td>
          </tr>
          <tr>
            <td><strong>Operating Current (Imp)</strong></td>
            <td class="val-num">9.80 A</td>
            <td class="val-num" style="color:#b45309;">19.60 A</td>
            <td class="val-num" style="color:#4338ca;">19.60 A</td>
            <td>Series: I_total = I_module. Parallel: I_total = I1 + I2.</td>
          </tr>
          <tr>
            <td><strong>Open-Circuit Voltage (Voc)</strong></td>
            <td class="val-num">48.6 V</td>
            <td class="val-num">24.3 V</td>
            <td class="val-num">48.6 V</td>
            <td>Voc adds per series module. Critical for MPPT max voltage check.</td>
          </tr>
          <tr>
            <td><strong>Short-Circuit Current (Isc)</strong></td>
            <td class="val-num">10.20 A</td>
            <td class="val-num">20.40 A</td>
            <td class="val-num">20.40 A</td>
            <td>Isc adds per parallel branch. Determines minimum wire ampacity.</td>
          </tr>
          <tr>
            <td><strong>Total Rated Power</strong></td>
            <td class="val-num">400 W</td>
            <td class="val-num">400 W</td>
            <td class="val-num">800 W</td>
            <td>P = Vmp × Imp. Uniform irradiance delivers identical power per panel count.</td>
          </tr>
          <tr>
            <td><strong>Conductor Size &amp; Drop</strong></td>
            <td>10 AWG to 12 AWG (Low Drop)</td>
            <td>8 AWG to 6 AWG (High Drop)</td>
            <td>10 AWG (Balanced)</td>
            <td>Higher voltage lowers line current, preventing heavy copper costs.</td>
          </tr>
          <tr>
            <td><strong>Partial Shading Response</strong></td>
            <td>String current restricted</td>
            <td>Independent branch output</td>
            <td>Isolated to shaded string</td>
            <td>Bypass diodes bypass shaded cells; parallel isolates unaffected strings.</td>
          </tr>
          <tr>
            <td><strong>Charge Controller Type</strong></td>
            <td>MPPT Required</td>
            <td>PWM or MPPT</td>
            <td>MPPT Required</td>
            <td>PWM drops array voltage to battery voltage; MPPT steps down V to gain Amps.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section: Wire Sizing & Voltage Drop Reference -->
    <div class="section-title">
      <span>3. Conductor Resistance &amp; Voltage-Drop Engineering Benchmark</span>
      <span class="badge">NEC Ch. 9, Table 8 Stranded Uncoated Copper @ 75°C Conductor Operating Temp</span>
    </div>
    <div class="table-container">
      <table class="ref-table">
        <thead>
          <tr>
            <th>AWG Size</th>
            <th>DC Resistance (Ω / 1,000 ft)</th>
            <th>Series 2S Drop (40.8V, 9.8A, 50 ft)</th>
            <th>Series 2S % Drop</th>
            <th>Parallel 2P Drop (20.4V, 19.6A, 50 ft)</th>
            <th>Parallel 2P % Drop</th>
            <th>Compliance Assessment (3% Target)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>12 AWG</strong></td>
            <td class="val-num">1.98 Ω</td>
            <td class="val-num">1.94 V</td>
            <td class="val-num" style="color:#d97706; font-weight:bold;">4.75%</td>
            <td class="val-num">3.88 V</td>
            <td class="val-num" style="color:#dc2626; font-weight:bold;">19.02%</td>
            <td>Unacceptable for parallel; exceeds recommended 3% threshold.</td>
          </tr>
          <tr class="highlight-row">
            <td><strong>10 AWG</strong></td>
            <td class="val-num">1.24 Ω</td>
            <td class="val-num">1.22 V</td>
            <td class="val-num" style="color:#16a34a; font-weight:bold;">2.98%</td>
            <td class="val-num">2.43 V</td>
            <td class="val-num" style="color:#dc2626; font-weight:bold;">11.91%</td>
            <td><strong>Optimal for Series 2S</strong> (&lt;3%). Unacceptable for Parallel 2P.</td>
          </tr>
          <tr>
            <td><strong>8 AWG</strong></td>
            <td class="val-num">0.778 Ω</td>
            <td class="val-num">0.76 V</td>
            <td class="val-num" style="color:#16a34a; font-weight:bold;">1.87%</td>
            <td class="val-num">1.52 V</td>
            <td class="val-num" style="color:#d97706; font-weight:bold;">7.47%</td>
            <td>Excellent for Series. Borderline for Parallel (exceeds 3% limit).</td>
          </tr>
          <tr class="highlight-row">
            <td><strong>6 AWG</strong></td>
            <td class="val-num">0.491 Ω</td>
            <td class="val-num">0.48 V</td>
            <td class="val-num" style="color:#16a34a; font-weight:bold;">1.18%</td>
            <td class="val-num">0.96 V</td>
            <td class="val-num" style="color:#16a34a; font-weight:bold;">4.72%</td>
            <td>Required for Parallel home-runs to control line losses below 5%.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="callout-box callout-warning">
      <div>
        <div class="callout-title">Engineering Caveat &amp; National Electrical Code Notice</div>
        <div>Voltage drop formula: <em>V_drop = 2 × L × R × I ÷ 1000</em> (where L = 50 ft one-way, 100 ft total loop). While voltage drop optimization prevents power loss, code compliance mandates conductor sizing based on <strong>NEC 690.8</strong> minimum circuit ampacity: <em>I_max = Isc × 1.25 (continuous load) × 1.25 (irradiance reflection) = 1.56 × Isc</em>, plus ambient temperature derating (NEC 310.15(B)(1)) and conduit fill adjustments (NEC 310.15(C)(1)).</div>
      </div>
    </div>
  </div>

  <!-- Footer Page 1 -->
  <div class="page-footer">
    <div class="legal">CalcMyPower.com &bull; Engineering Sizing Reference &bull; Not an Installation Blueprint</div>
    <div>Page 1 of 2</div>
  </div>
</div>

<!-- ========================================== PAGE 2 ========================================== -->
<div class="page page-last">
  <div>
    <!-- Header -->
    <div class="header-bar">
      <div>
        <div class="brand-row">
          <span class="brand-badge" style="background:#059669;">System Safety &amp; Architecture</span>
          <span class="brand-sub">US National Electrical Code (NEC / NFPA 70 Articles 690, 705, 706)</span>
        </div>
        <h1 class="doc-title">Complete Off-Grid Solar Electrical System Architecture</h1>
        <p class="doc-subtitle">Component Sequencing, Overcurrent Protection Boundaries, Disconnect Placement &amp; Commissioning Protocol</p>
      </div>
      <div class="header-meta">
        <div><strong>Document ID:</strong> CMP-REF-SOLAR-02</div>
        <div><strong>Electrical Safety:</strong> Life Safety Notice</div>
        <div><strong>Tools:</strong> <a href="https://calcmypower.com/solar-charge-controller-calculator">calcmypower.com</a></div>
      </div>
    </div>

    <!-- Section: Conceptual Architecture Schematic -->
    <div class="section-title">
      <span>1. Complete System Electrical Topology (Conceptual Schematic)</span>
      <span class="badge">Conceptual Diagram: Not a Universal Installation Blueprint</span>
    </div>

    <div class="arch-schematic-container">
      <svg viewBox="0 0 760 170" width="100%" height="100%" style="font-family: sans-serif;">
        <!-- Background grid styling -->
        <rect width="760" height="170" fill="#f8fafc" rx="4"/>

        <!-- 1. PV ARRAY -->
        <g transform="translate(15, 15)">
          <rect width="100" height="90" rx="4" fill="#1e293b" stroke="#0284c7" stroke-width="1.5"/>
          <text x="50" y="16" fill="#38bdf8" font-size="8" font-weight="bold" text-anchor="middle">SOLAR PV ARRAY</text>
          <text x="50" y="27" fill="#94a3b8" font-size="6.5" text-anchor="middle">(Series / Parallel)</text>
          <line x1="10" y1="35" x2="90" y2="35" stroke="#334155" stroke-width="1"/>
          <text x="50" y="47" fill="#f8fafc" font-size="6" text-anchor="middle">Photovoltaic Modules</text>
          <text x="50" y="58" fill="#cbd5e1" font-size="5.5" text-anchor="middle">Heavy-duty MC4 leads</text>
          <text x="50" y="70" fill="#94a3b8" font-size="5" text-anchor="middle">Equipment Ground EGC</text>
          <rect x="20" y="76" width="60" height="10" rx="2" fill="#0f172a"/>
          <text x="50" y="83.5" fill="#38bdf8" font-size="5" font-weight="bold" text-anchor="middle">Voc Cold Calculated</text>
        </g>

        <!-- Conductor line to Disconnect -->
        <path d="M 115 50 L 140 50" stroke="#dc2626" stroke-width="2"/>
        <path d="M 115 70 L 140 70" stroke="#1e3a8a" stroke-width="2"/>

        <!-- 2. PV DISCONNECT / FUSING -->
        <g transform="translate(140, 20)">
          <rect width="75" height="80" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <text x="37" y="15" fill="#0f172a" font-size="7" font-weight="bold" text-anchor="middle">PV DC DISCONNECT</text>
          <text x="37" y="24" fill="#64748b" font-size="5.5" text-anchor="middle">NEC 690.13</text>
          <rect x="15" y="32" width="45" height="24" rx="2" fill="#fef2f2" stroke="#dc2626" stroke-width="1"/>
          <text x="37" y="43" fill="#991b1b" font-size="5.5" font-weight="bold" text-anchor="middle">DC Breaker /</text>
          <text x="37" y="51" fill="#991b1b" font-size="5.5" font-weight="bold" text-anchor="middle">String Fuse Box</text>
          <text x="37" y="68" fill="#475569" font-size="5" text-anchor="middle">Rated for Array Voc</text>
        </g>

        <!-- Line to Controller -->
        <path d="M 215 50 L 245 50" stroke="#dc2626" stroke-width="2"/>
        <path d="M 215 70 L 245 70" stroke="#1e3a8a" stroke-width="2"/>

        <!-- 3. MPPT CHARGE CONTROLLER -->
        <g transform="translate(245, 15)">
          <rect width="110" height="90" rx="4" fill="#0284c7" stroke="#0369a1" stroke-width="1.5"/>
          <text x="55" y="17" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">MPPT CONTROLLER</text>
          <text x="55" y="27" fill="#e0f2fe" font-size="6" text-anchor="middle">DC-DC Buck Step-Down</text>
          <line x1="10" y1="33" x2="100" y2="33" stroke="#38bdf8" stroke-width="1"/>
          <text x="55" y="45" fill="#ffffff" font-size="6" text-anchor="middle">PV In: High V / Low I</text>
          <text x="55" y="55" fill="#e0f2fe" font-size="6" text-anchor="middle">Bat Out: Low V / High I</text>
          <text x="55" y="66" fill="#f8fafc" font-size="5.5" text-anchor="middle">Temperature Sensor</text>
          <rect x="15" y="74" width="80" height="11" rx="2" fill="#0369a1"/>
          <text x="55" y="82" fill="#ffffff" font-size="5.5" font-weight="bold" text-anchor="middle">Connect Battery 1st, PV 2nd</text>
        </g>

        <!-- Line to Battery Circuit -->
        <path d="M 355 50 L 385 50" stroke="#dc2626" stroke-width="2.5"/>
        <path d="M 355 70 L 385 70" stroke="#1e3a8a" stroke-width="2.5"/>

        <!-- Controller to Bat Fuse -->
        <g transform="translate(385, 38)">
          <rect width="25" height="44" rx="2" fill="#fff" stroke="#f59e0b" stroke-width="1.2"/>
          <text x="12" y="14" fill="#b45309" font-size="5" font-weight="bold" text-anchor="middle">FUSE</text>
          <text x="12" y="24" fill="#78350f" font-size="4.5" text-anchor="middle">1.25x</text>
          <text x="12" y="34" fill="#78350f" font-size="4.5" text-anchor="middle">Rated</text>
        </g>
        <path d="M 410 50 L 435 50" stroke="#dc2626" stroke-width="2.5"/>
        <path d="M 410 70 L 435 70" stroke="#1e3a8a" stroke-width="2.5"/>

        <!-- 4. BATTERY BUSBARS & BANK -->
        <g transform="translate(435, 10)">
          <!-- Busbars -->
          <rect x="0" y="30" width="10" height="50" rx="2" fill="#dc2626"/><text x="5" y="58" fill="#fff" font-size="6" font-weight="bold" text-anchor="middle">+</text>
          <rect x="15" y="30" width="10" height="50" rx="2" fill="#1e3a8a"/><text x="20" y="58" fill="#fff" font-size="6" font-weight="bold" text-anchor="middle">-</text>

          <!-- Class-T Fuse on Main Positive -->
          <rect x="35" y="32" width="30" height="20" rx="2" fill="#fef2f2" stroke="#dc2626" stroke-width="1.2"/>
          <text x="50" y="42" fill="#991b1b" font-size="5" font-weight="bold" text-anchor="middle">CLASS-T</text>
          <text x="50" y="49" fill="#991b1b" font-size="4.5" text-anchor="middle">20kA AIC</text>

          <!-- Battery Bank box -->
          <rect x="75" y="5" width="90" height="90" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
          <text x="120" y="19" fill="#34d399" font-size="7.5" font-weight="bold" text-anchor="middle">BATTERY BANK</text>
          <text x="120" y="29" fill="#a7f3d0" font-size="6" text-anchor="middle">12V / 24V / 48V Storage</text>
          <line x1="85" y1="35" x2="155" y2="35" stroke="#334155" stroke-width="1"/>
          <text x="120" y="47" fill="#f8fafc" font-size="6" text-anchor="middle">LiFePO4 / AGM Lead-Acid</text>
          <text x="120" y="58" fill="#cbd5e1" font-size="5.5" text-anchor="middle">High Discharge Current</text>
          <text x="120" y="69" fill="#94a3b8" font-size="5.5" text-anchor="middle">BMS Managed Protection</text>
          <rect x="85" y="75" width="70" height="12" rx="2" fill="#065f46"/>
          <text x="120" y="83" fill="#ffffff" font-size="5.5" font-weight="bold" text-anchor="middle">Main Disconnect Switch</text>

          <!-- Connections -->
          <path d="M 10 42 L 35 42" stroke="#dc2626" stroke-width="3"/>
          <path d="M 65 42 L 75 42" stroke="#dc2626" stroke-width="3"/>
          <path d="M 25 65 L 75 65" stroke="#1e3a8a" stroke-width="3"/>
        </g>

        <!-- 5. INVERTER & AC LOADS -->
        <!-- Feed from Busbar to Inverter -->
        <path d="M 440 35 L 440 20 L 620 20 L 620 30" fill="none" stroke="#dc2626" stroke-width="3"/>
        <path d="M 450 75 L 450 125 L 620 125 L 620 90" fill="none" stroke="#1e3a8a" stroke-width="3"/>

        <g transform="translate(610, 15)">
          <rect width="135" height="90" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="67" y="17" fill="#fbbf24" font-size="8" font-weight="bold" text-anchor="middle">DC-to-AC INVERTER</text>
          <text x="67" y="27" fill="#fef3c7" font-size="6" text-anchor="middle">Pure Sine Wave (120V / 240V)</text>
          <line x1="15" y1="33" x2="120" y2="33" stroke="#334155" stroke-width="1"/>
          <text x="67" y="45" fill="#f8fafc" font-size="6" text-anchor="middle">Sized for Continuous &amp; Surge kW</text>
          <text x="67" y="55" fill="#cbd5e1" font-size="5.5" text-anchor="middle">Direct Battery Cable Run</text>

          <!-- Sub-panel -->
          <rect x="15" y="62" width="105" height="23" rx="2" fill="#1e293b" stroke="#64748b" stroke-width="1"/>
          <text x="67" y="73" fill="#38bdf8" font-size="5.5" font-weight="bold" text-anchor="middle">AC DISTRIBUTION SUBPANEL</text>
          <text x="67" y="81" fill="#e2e8f0" font-size="5" text-anchor="middle">GFCI / AFCI Household Branch Circuits</text>
        </g>

        <!-- Grounding Busbar line -->
        <g transform="translate(20, 130)">
          <line x1="0" y1="15" x2="720" y2="15" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="6,3"/>
          <text x="360" y="10" fill="#15803d" font-size="6" font-weight="bold" text-anchor="middle">
            EQUIPMENT GROUNDING CONDUCTOR (EGC) BUS: NEC 250 &amp; 690.43 (Panel Frames, Racks, Inverter Chassis &amp; Ground Rod)
          </text>
          <!-- Ground symbols -->
          <path d="M 360 15 L 360 25 M 350 25 L 370 25 M 354 28 L 366 28 M 357 31 L 363 31" stroke="#16a34a" stroke-width="1.2"/>
        </g>

        <!-- Bottom Warning Label -->
        <rect x="15" y="152" width="730" height="14" rx="2" fill="#fef2f2" stroke="#fecaca" stroke-width="0.8"/>
        <text x="380" y="161.5" fill="#991b1b" font-size="5.5" font-weight="bold" text-anchor="middle">
          CONCEPTUAL ARCHITECTURE ONLY - NOT A PHYSICAL BLUEPRINT. Specific wire gauges, fuse ratings, disconnect types, and grounding topology depend on actual hardware and local code.
        </text>
      </svg>
    </div>

    <!-- Section: Safety Rules & Checklists Grid -->
    <div class="checklist-grid">
      <!-- Left Card: Overcurrent Protection & Code Rules -->
      <div class="checklist-card">
        <div class="card-subtitle">Overcurrent Protection &amp; NEC Requirements</div>
        <ul class="checklist-items">
          <li><strong>String Fusing (NEC 690.9):</strong> 1S and 2P configurations generally do not require branch string fuses if conductors are sized to 1.56 &times; Isc. When 3 or more strings are wired in parallel, each string requires an individual fuse to prevent combined backfeed current into a faulted panel.</li>
          <li><strong>Cold-Weather Voc (NEC 690.7):</strong> Open-circuit voltage rises sharply below 25&deg;C: <em>Voc_cold = Voc_STC &times; [1 + (&alpha;_Voc &divide; 100 &times; (T_min - 25&deg;C))]</em>. Never exceed the controller maximum input voltage rating; overvoltage causes catastrophic hardware failure.</li>
          <li><strong>Class-T Battery Fuses (NEC 706):</strong> Lithium (LiFePO4) battery banks possess massive short-circuit current capabilities. Use a high-interrupting Class-T fuse (20,000A AIC rating) within 7 inches of the positive battery terminal to prevent electrical fires.</li>
          <li><strong>Continuous Load Factor (NEC 690.8):</strong> Solar circuits generate continuous current (3+ hours). All conductors and overcurrent devices must be rated for at least 125% of maximum circuit current.</li>
        </ul>
      </div>

      <!-- Right Card: Installation & Commissioning Safety Checklist -->
      <div class="checklist-card">
        <div class="card-subtitle">Commissioning &amp; Field Safety Checklist</div>
        <ul class="checklist-items">
          <li><strong>Multimeter Verification:</strong> Test array polarity (+ / -) and open-circuit voltage (Voc) with a digital multimeter before connecting to the charge controller or closing circuit breakers.</li>
          <li><strong>Sequential Commissioning:</strong> Always connect the Battery to the Charge Controller FIRST so the unit detects system voltage. Connect the Solar Array SECOND. (When decommissioning, reverse order: disconnect PV first, then Battery).</li>
          <li><strong>Never Disconnect Under Load:</strong> DC arcs do not self-extinguish at zero crossings like AC power. Never unplug MC4 connectors while current is flowing; open the DC disconnect switch first.</li>
          <li><strong>Calibrated Terminal Torque:</strong> Torque all electrical lugs, busbar bolts, and terminal blocks to manufacturer-specified inch-pounds using a calibrated torque wrench. Loose connections cause high-resistance fires.</li>
          <li><strong>Equipment Grounding:</strong> Bond all solar panel aluminum frames, racking rails, controller chassis, and inverter ground lugs to the system grounding electrode per NEC 250.</li>
        </ul>
      </div>
    </div>

    <!-- Section: Authoritative References & Citations -->
    <div class="section-title">
      <span>2. Authoritative US Engineering Standards &amp; Verified Citations</span>
      <span class="badge">Official Technical Reference Documents</span>
    </div>

    <div class="citations-block">
      <div>
        <div><strong>1. NFPA 70: National Electrical Code (NEC):</strong> Articles 690 (Solar PV), 705 (Interconnected Sources), 706 (Energy Storage) &bull; <a href="https://www.nfpa.org">nfpa.org</a></div>
        <div><strong>2. IEEE Standard 1547:</strong> Standard for Interconnection and Interoperability of Distributed Energy Resources &bull; <a href="https://standards.ieee.org">standards.ieee.org</a></div>
        <div><strong>3. UL 1741:</strong> Inverters, Converters, Controllers and Interconnection System Equipment for Distributed Energy &bull; <a href="https://www.ul.com">ul.com</a></div>
        <div><strong>4. NREL Photovoltaic Guidelines:</strong> National Renewable Energy Laboratory Design Best Practices &bull; <a href="https://www.nrel.gov">nrel.gov</a></div>
      </div>
      <div style="text-align: right; font-weight: 600;">
        <div>Online Interactive Calculators:</div>
        <div><a href="https://calcmypower.com/solar-panels-series-vs-parallel">calcmypower.com/solar-panels-series-vs-parallel</a></div>
      </div>
    </div>
  </div>

  <!-- Footer Page 2 -->
  <div class="page-footer">
    <div class="legal">&copy; 2026 CalcMyPower.com &bull; Preliminary Planning Guide &bull; Consult a Licensed Electrician for Permitted Physical Installations</div>
    <div>Page 2 of 2</div>
  </div>
</div>

</body>
</html>
"""

    with open(temp_html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

    chrome_exe = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
    if not os.path.exists(chrome_exe):
        chrome_exe = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

    print(f"Using browser executable: {chrome_exe}")
    print(f"Generating PDF to: {pdf_path}")

    # Use file:/// with forward slashes
    html_url = f"file:///{temp_html_path.replace(os.sep, '/')}"

    cmd = [
        chrome_exe,
        '--headless',
        '--disable-gpu',
        '--run-all-compositor-stages-before-draw',
        '--no-pdf-header-footer',
        f'--print-to-pdf={pdf_path}',
        html_url
    ]

    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print("Chrome error:", res.stderr)
        raise RuntimeError(f"Chrome failed with exit code {res.returncode}")

    if os.path.exists(temp_html_path):
        os.remove(temp_html_path)

    # Verify with pypdfium2
    pdf = pdfium.PdfDocument(pdf_path)
    page_count = len(pdf)
    size_bytes = os.path.getsize(pdf_path)
    print(f"SUCCESS: PDF generated successfully!")
    print(f"Destination: {pdf_path}")
    print(f"Total Pages: {page_count}")
    print(f"File Size: {size_bytes} bytes ({size_bytes / 1024:.2f} KB)")

    if page_count != 2:
        raise ValueError(f"ERROR: Expected exactly 2 pages, but got {page_count} pages!")

    # Render each page to an image to verify visual rendering
    for i in range(page_count):
        page = pdf[i]
        image = page.render(scale=2.0).to_pil()
        preview_path = os.path.join(output_dir, f'pdf_page_{i+1}_preview.png')
        image.save(preview_path)
        print(f"Saved preview of page {i+1} to: {preview_path}")

if __name__ == '__main__':
    generate_pdf()
