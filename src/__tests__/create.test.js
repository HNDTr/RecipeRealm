import React from 'react';
import {render, screen} from '@testing-library/react';
import Creator from '@/pages/create';


describe("Create Recipe Page", () => {
  beforeEach(() => {
    render(<Creator />);
  });

  describe("Form Inputs", () => {
    test('Title input element is present', () => {
      const element = screen.getByPlaceholderText("Title must be set");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute('type', 'text');
    });

    test('Servings input element is present', () => {
      const element = screen.getByPlaceholderText("Servings");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute('type', 'text');
      expect(element).toHaveAttribute('placeholder', 'Servings');
    });

    test('Preparation Steps text area is visible', () => {
      const element = screen.getByPlaceholderText("Preparation Steps");
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('TEXTAREA');
  });


  });

  describe("Buttons", () => {
    test('Delete Ingredient button is present', () => {
      const element = screen.getByText("Delete Ingredient");
      expect(element).toBeInTheDocument();
    });

    test('Add Ingredient button is present', () => {
      const element = screen.getByText("Add Ingredient");
      expect(element).toBeInTheDocument();
    });


  });

  describe("Checkboxes and Dropdowns", () => {
    test('Public checkbox is present', () => {
      const element = screen.getByTestId("publicCheckbox");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute('type', 'checkbox');
    });

    test('Dropdown for unit measurements is present', () => {
      const element = screen.getByTestId("unitType");
      expect(element).toBeInTheDocument();
    });

    test('All options for dietary restrictions are present', () => {
        const element1 = screen.getByText("Food Allergies");
        const element2 = screen.getByText("Dietary Restrictions");
        const element3 = screen.getByText("Time");
        const element4 = screen.getByText("Difficulty");
  
        expect(element1).toBeInTheDocument();
        expect(element2).toBeInTheDocument();
        expect(element3).toBeInTheDocument();
        expect(element4).toBeInTheDocument();
      });
  });


  describe("Buttons", () => {
    test('Save Button is present', () => {
      const element = screen.getByText("Save");
      expect(element).toBeInTheDocument();
    });

    test('Cancel Button is present', () => {
      const element = screen.getByText("Cancel");
      expect(element).toBeInTheDocument();
    });
  });
});
