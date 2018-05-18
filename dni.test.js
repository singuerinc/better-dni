const assert = require('assert');
const { valid, isNIE, isNIF } = require('./index');

describe('dni', () => {
  describe('isNIE', () => {
    it('should return if is nie with X', () => {
      assert.equal(true, isNIE('x0000000a'));
    });

    it('should return if is nie with Y', () => {
      assert.equal(true, isNIE('y0000000a'));
    });

    it('should return if is nie with Z', () => {
      assert.equal(true, isNIE('Z0000000A'));
    });

    it('should return if is not nie', () => {
      assert.equal(false, isNIE('Z000000AA'));
    });
  });

  describe('isNIF', () => {
    it('should return if is nif', () => {
      assert.equal(true, isNIF('00000000A'));
    });

    it('should return if is not nif', () => {
      assert.equal(false, isNIF('0000000AA'));
    });
  });

  describe('valid', () => {
    describe('nif', () => {
      it('should validate 55799910R', () => {
        assert.equal(valid('55799910R'), true);
      });

      it('should validate 50172129K', () => {
        assert.equal(valid('50172129K'), true);
      });

      it('should validate 11964487W', () => {
        assert.equal(valid('11964487W'), true);
      });
    });

    describe('nie', () => {
      it('should validate Z0697009E', () => {
        assert.equal(valid('z0697009e'), true);
      });

      it('should validate Y2843665M', () => {
        assert.equal(valid('y2843665m'), true);
      });

      it('should validate Z7662566Y', () => {
        assert.equal(valid('z7662566y'), true);
      });

      it('should validate " Z7662566-Y"', () => {
        assert.equal(valid(' z7662566-y'), true);
      });

      it('should validate " Z7662566-Y   "', () => {
        assert.equal(valid(' z7662566-y   '), true);
      });

      it('should validate 00631803Q', () => {
        assert.equal(valid('00631803q'), true);
      });

      it('should not validate X9464186X', () => {
        assert.equal(valid('X9464186X'), false);
      });

      it('should not validate Z1464186P', () => {
        assert.equal(valid('Z1464186P'), false);
      });
    });
  });

  describe('errors', () => {
    it('should handle empty strings', () => {
      assert.equal(valid(''), false);
      assert.equal(isNIE(''), false);
      assert.equal(isNIF(''), false);
    });

    it('should handle null values', () => {
      assert.equal(valid(null), false);
      assert.equal(isNIE(null), false);
      assert.equal(isNIF(null), false);
    });

    it('should handle undefined values', () => {
      assert.equal(valid(undefined), false);
      assert.equal(isNIE(undefined), false);
      assert.equal(isNIF(undefined), false);
    });
  });
});
