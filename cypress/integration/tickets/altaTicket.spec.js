// AltaTicket.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />

describe("Alta de ticket", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:3000/tickets/nuevo");
  });

  it("Alta de ticket CON ASISTENCIA VIAL", () => {
    cy.get("#num_expediente").type("270986/303526");
    cy.get("#asistencia_vial").click({ force: true });
    cy.get("#fecha_llamada").type("2020-04-30T09:41");
    cy.get("#nombre_asesor_gpo_lias").type("Juan Vazquez");
    cy.get("#nombre_asesor_aseguradora").type("Jaqueline Vazquez");
    cy.get("#nombre_usuario_final").type("Emmanuel Esquivel");
    cy.get("#titulo_ticket").type("Usuario Barado en carretera");

    cy.get("#aseguradoraId").select(1);

    cy.get("#asistenciaId").focus();
    cy.get("#asistenciaId").select(1);

    cy.get("#problematica").type(
      'Mecanico o grua en la carretera salida Zinapecuaro'
    );

    cy.get("#Mecanico").check({ force: true });
    cy.get("#Grua").check({ force: true });
    cy.get("#ciudad").select(1);

    cy.get("#colonia").type("Vista Hermosa");
    cy.get("#calle").type("Miradores de la Sierra");
    cy.get("#numero_domicilio").type("130");
    cy.get("#banderazo").type("150");
    cy.get("#cobertura").type("1000");
    cy.get("#total_salida").type("200");
    cy.get("#costo_gpo_lias").type("130");
    cy.get("#deducible").type("0");
    cy.get("#kilometraje").type("5");
    cy.get("#casetas").type("0");
    cy.get("#total").type("300");
    cy.get("#anticipo").type("150");
    cy.get("#cotizacion_gpo_lias").type(
      "Se requiere tambien de un soporte para pantalla"
    );
    cy.get("#publicarTicket").click();
    cy.get("#altaExitosa", { timeout: 10000 }).should(
      "contain",
      "Ticket creado"
    );
  });

  it("Alta de ticket SIN ASISTENCIA VIAL", () => {
    cy.get("#num_expediente").type("270986/303527");
    cy.get("#fecha_llamada").type("2020-04-30T09:41");
    cy.get("#nombre_asesor_gpo_lias").type("Juan Vazquez");
    cy.get("#nombre_asesor_aseguradora").type("Maria Lopez");
    cy.get("#nombre_usuario_final").type("Michelle Patiño");
    cy.get("#titulo_ticket").type("HandyMan para montar una pantalla");

    cy.get("#aseguradoraId").select(1);

    cy.get("#asistenciaId").focus();
    cy.get("#asistenciaId").select(1);

    cy.get("#problematica").type('HandyMan para montar una pantalla de 72"');

    cy.get("#Plomeria").check({ force: true });
    cy.get("#ciudad").select(1);

    cy.get("#colonia").type("Vista Hermosa");
    cy.get("#calle").type("Miradores de la Sierra");
    cy.get("#numero_domicilio").type("130");
    cy.get("#cobertura").type("1000");
    cy.get("#total_salida").type("200");
    cy.get("#costo_gpo_lias").type("130");
    cy.get("#deducible").type("0");
    cy.get("#kilometraje").type("5");
    cy.get("#casetas").type("0");
    cy.get("#total").type("300");
    cy.get("#anticipo").type("150");
    cy.get("#cotizacion_gpo_lias").type(
      "Se requiere tambien de un soporte para pantalla"
    );
    cy.get("#publicarTicket").click();

    cy.get("#altaExitosa", { timeout: 10000 }).should(
      "contain",
      "Ticket creado"
    );
  });
});
